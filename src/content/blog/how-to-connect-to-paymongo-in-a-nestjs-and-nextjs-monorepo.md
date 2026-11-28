---
title: "How to Connect PayMongo in a NestJS and Next.js Monorepo"
date: "2026-10-31"
summary: "Connect a Next.js checkout to a NestJS backend that creates PayMongo payment intents and handles webhooks."
tags: ["nextjs", "nestjs", "payments"]
---

This walkthrough uses a single GCash payment in PayMongo test mode. NestJS owns the order total and confirms the payment. Next.js starts checkout and redirects the customer to authorize it. The examples assume your application already has authenticated orders and a way to store payment attempts.

## 1. Configure Environment Variables

Set the test API key and the signing secret for your test webhook endpoint in NestJS. Keep both on the backend and out of Git.

```dotenv
PAYMONGO_SECRET_KEY=sk_test_replace_me
PAYMONGO_WEBHOOK_SECRET=replace_with_test_webhook_signing_secret
```

Set the test public key in Next.js. This value is visible to the browser.

```dotenv
NEXT_PUBLIC_PAYMONGO_PUBLIC_KEY=pk_test_replace_me
```

## 2. Create a Payment Intent in NestJS

Expose an authenticated, same-origin checkout endpoint such as `POST /api/orders/:orderId/payment-intent`. Look up the order for the signed-in customer, check that it is payable, and read the stored total in centavos. Apply your app's CSRF protection if it uses cookie sessions. The browser supplies the order ID. The server determines the amount and currency.

```ts
import { Injectable } from '@nestjs/common';

type IntentResponse = {
  data: { id: string; attributes: { client_key: string } };
};

@Injectable()
export class PaymentService {
  async createGcashIntent(totalInCentavos: number) {
    const secretKey = process.env.PAYMONGO_SECRET_KEY;
    if (!secretKey?.startsWith('sk_test_')) {
      throw new Error('Configure a PayMongo test secret key');
    }
    if (!Number.isSafeInteger(totalInCentavos) || totalInCentavos <= 0) {
      throw new Error('Order total must be a positive integer in centavos');
    }

    const response = await fetch('https://api.paymongo.com/v1/payment_intents', {
      method: 'POST',
      redirect: 'error',
      signal: AbortSignal.timeout(15_000),
      headers: {
        Authorization: 'Basic ' + Buffer.from(secretKey + ':').toString('base64'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          attributes: {
            amount: totalInCentavos,
            currency: 'PHP',
            payment_method_allowed: ['gcash'],
          },
        },
      }),
    });

    if (!response.ok) throw new Error('PayMongo could not create the payment intent');

    const { data }: IntentResponse = await response.json();
    return { intentId: data.id, clientKey: data.attributes.client_key };
  }
}
```

Persist the intent ID, order ID, expected amount, currency, and mode before returning the intent ID and client key to that customer. Reuse an active intent for the same order. Serialize intent creation per order so concurrent clicks or retries cannot start competing attempts. Reconcile an uncertain provider response before starting another intent. Keep the client key scoped to this checkout and out of logs. [PayMongo’s Create a Payment Intent reference](https://docs.paymongo.com/reference/create-a-paymentintent)

## 3. Trigger Payment from Next.js

The example assumes Next.js routes the same-origin endpoint to NestJS and supplies any CSRF token your application requires. Use an HTTPS checkout and return page when testing the provider redirect.

```tsx
'use client';

import { useState } from 'react';

type Intent = { intentId: string; clientKey: string };
type PaymentMethod = { data: { id: string } };
type AttachedIntent = {
  data: {
    attributes: {
      status: string;
      next_action?: { redirect?: { url?: string } } | null;
    };
  };
};

async function postJson<T>(url: string, body?: object, authorization?: string): Promise<T> {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  if (authorization) headers.set('Authorization', authorization);

  const response = await fetch(url, {
    method: 'POST',
    redirect: 'error',
    signal: AbortSignal.timeout(15_000),
    headers,
    body: body && JSON.stringify(body),
  });

  if (!response.ok) throw new Error('Checkout request failed');
  return response.json();
}

export default function CheckoutButton({ orderId }: { orderId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleCheckout() {
    setLoading(true);
    setError('');

    try {
      const publicKey = process.env.NEXT_PUBLIC_PAYMONGO_PUBLIC_KEY;
      if (!publicKey?.startsWith('pk_test_')) throw new Error('Missing test public key');

      const orderPath = '/api/orders/' + encodeURIComponent(orderId);
      const { intentId, clientKey } = await postJson<Intent>(orderPath + '/payment-intent');
      const authorization = 'Basic ' + btoa(publicKey + ':');
      const provider = 'https://api.paymongo.com/v1';
      const method = await postJson<PaymentMethod>(provider + '/payment_methods', {
        data: { attributes: { type: 'gcash' } },
      }, authorization);
      const returnUrl = new URL('/checkout/complete', window.location.origin);
      returnUrl.searchParams.set('orderId', orderId);

      const { data } = await postJson<AttachedIntent>(
        provider + '/payment_intents/' + encodeURIComponent(intentId) + '/attach',
        {
          data: {
            attributes: {
              payment_method: method.data.id,
              client_key: clientKey,
              return_url: returnUrl.href,
            },
          },
        },
        authorization,
      );

      const { status, next_action: nextAction } = data.attributes;
      if (status === 'awaiting_next_action' && nextAction?.redirect?.url) {
        const redirect = new URL(nextAction.redirect.url);
        if (redirect.protocol !== 'https:') throw new Error('Unexpected redirect protocol');
        window.location.assign(redirect.href);
      } else if (status === 'processing' || status === 'succeeded') {
        window.location.assign(returnUrl.href);
      } else {
        throw new Error('Payment authorization could not start');
      }
    } catch {
      setError('Could not start checkout. Check your order before trying again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button type="button" disabled={loading} onClick={handleCheckout}>
        {loading ? 'Starting checkout…' : 'Pay with GCash'}
      </button>
      {error && <p role="alert">{error}</p>}
    </>
  );
}
```

On the return page, show the result from your authenticated order endpoint. Treat the return URL and browser status as navigation information. Use the backend's verified payment state to decide whether the order is paid. [PayMongo’s e-wallet flow](https://docs.paymongo.com/docs/payment-acceptance-e-wallets) · [Payment Intent quick start](https://docs.paymongo.com/docs/payment-acceptance-quick-start)

## 4. Handle Webhooks in NestJS

Register a test webhook for `payment.paid` and `payment.failed`. Enable `rawBody: true` when creating the Nest application and pass the original request bytes from `req.rawBody` to the verifier. Use the `Paymongo-Signature` header and the webhook endpoint's signing secret. Verify the signature before parsing the event or using its fields. [NestJS raw body setup](https://docs.nestjs.com/faq/raw-body) · [PayMongo’s signature format](https://docs.paymongo.com/docs/developer-tools-webhook-setup-management)

```ts
import { createHmac, timingSafeEqual } from 'node:crypto';

export function verifyTestWebhook(
  rawBody: Buffer,
  header: string | undefined,
  secret: string,
): boolean {
  if (!header || !secret) return false;

  const fields = header.split(',').map((field) => field.trim());
  const timestamps = fields.filter((field) => field.startsWith('t='));
  const signatures = fields.filter((field) => field.startsWith('te='));
  const timestamp = timestamps[0]?.slice(2) ?? '';
  const signature = signatures[0]?.slice(3) ?? '';

  if (
    timestamps.length !== 1 ||
    signatures.length !== 1 ||
    !/^\d+$/.test(timestamp) ||
    !/^[a-f0-9]{64}$/i.test(signature)
  ) {
    return false;
  }

  const expected = createHmac('sha256', secret)
    .update(timestamp + '.')
    .update(rawBody)
    .digest();

  return timingSafeEqual(expected, Buffer.from(signature, 'hex'));
}
```

Handle delivery in this order:

1. Reject missing or invalid signatures. Require a valid event payload for the expected test mode (`livemode: false`). Keep test and live endpoints and secrets separate. A live handler checks `li` with its own signing secret.
2. For `payment.paid`, find the stored order attempt by the payment's `payment_intent_id`. Confirm the payment is paid and that its amount in centavos, currency, and mode match the saved attempt. A missing or mismatched attempt must never trigger fulfillment. On `payment.failed`, record the failure for that attempt without downgrading an order that is already paid.
3. In one database transaction, record the event ID with a uniqueness constraint, transition the order to paid only if it has not already transitioned, and persist one fulfillment record keyed by order ID. Acknowledge an already processed event without repeating fulfillment. If fulfillment calls an external service, process that record using the order ID as an idempotency key.
4. Return success after saving the outcome. If persistence fails, return an error so PayMongo can retry. Test invalid signatures, mismatched totals, and duplicate delivery before using the flow outside test mode.

After validating and mapping the signed payload, pass the paid event to this order check. Implement `recordPaidOnce` with the transaction described above.

```ts
type PaidEvent = {
  eventId: string;
  intentId: string;
  amount: number;
  currency: string;
  liveMode: boolean;
  status: string;
};

type PaymentAttempt = {
  orderId: string;
  intentId: string;
  amount: number;
  currency: string;
  liveMode: boolean;
};

export async function applyPaidEvent(
  event: PaidEvent,
  attempt: PaymentAttempt | undefined,
  recordPaidOnce: (orderId: string, eventId: string) => Promise<'applied' | 'duplicate'>,
) {
  if (
    !attempt ||
    event.status !== 'paid' ||
    event.intentId !== attempt.intentId ||
    event.amount !== attempt.amount ||
    event.currency !== attempt.currency ||
    event.liveMode ||
    event.liveMode !== attempt.liveMode
  ) {
    return 'unmatched';
  }

  return recordPaidOnce(attempt.orderId, event.eventId);
}
```

[PayMongo’s event payloads](https://docs.paymongo.com/docs/developer-tools-webhooks-events) · [Webhook retry behavior](https://docs.paymongo.com/docs/developer-tools-webhooks-key-concepts)
