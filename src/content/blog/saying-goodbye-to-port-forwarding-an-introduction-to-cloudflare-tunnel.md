---
title: "Saying Goodbye to Port Forwarding: An Introduction to Cloudflare Tunnel"
date: "2026-11-07"
summary: "Learn how Cloudflare Tunnel exposes a local service and when to choose a quick or named tunnel."
tags: ["cloudflare", "networking", "deployment"]
---

[Cloudflare Tunnel](https://developers.cloudflare.com/tunnel/) lets you connect a local application to Cloudflare without forwarding an inbound port to your origin. A published hostname can still make the application reachable from the internet. Decide who should have access before creating that route.

---

## How It Works: The Magic of `cloudflared`

The `cloudflared` process runs near your application and opens outbound connections to Cloudflare. Requests to the published hostname arrive at Cloudflare, pass through the tunnel, and reach the local service you selected.

```text
Browser → Cloudflare edge → established tunnel → cloudflared → local app
```

The tunnel does not require inbound port forwarding. Keep the origin’s existing firewall and access controls in place. Other public routes to the origin remain separate.

---

## Key Benefits of Going Portless

- You can publish an HTTP service without exposing its origin address through an inbound port forward.
- Cloudflare can provide TLS at the edge and apply security or caching policies according to your configuration.
- Cloudflare Access can require authentication for a published hostname. An outbound tunnel alone does not decide who can open that hostname.

---

## Two Ways to Get Started

### 1. Quick Tunnels (Best for rapid testing)

Use a public Quick Tunnel for a temporary demo you are comfortable sharing with anyone who has the URL. With a local server running on port `8080`, run:

```bash
cloudflared tunnel --url http://localhost:8080
```

The command creates a temporary `trycloudflare.com` address while `cloudflared` runs. Use the [Quick Tunnels guide](https://developers.cloudflare.com/tunnel/get-started/quick-tunnels/) for development limits and available access options.

### 2. Named Tunnels (Best for permanent infrastructure)

For an internal app, first create a Cloudflare Access application for the intended hostname and add a policy that allows the intended users. Without that protection, a published route is available to anyone who can reach the hostname. [Cloudflare Access setup for self-hosted apps](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/)

1. In the Cloudflare dashboard, go to **Networking → Tunnels** and create or select a tunnel. Install the connector using Cloudflare’s instructions for your operating system. Keep the tunnel token private.
2. Under **Routes**, add a **Published application** route. Map a hostname you manage, such as `app.example.com`, to the origin, such as `http://localhost:3000`.
3. For a protected app, check that an approved user can sign in and that an unauthenticated visitor cannot reach the origin through the published hostname. Follow Cloudflare’s guidance for validating Access tokens at the origin or connector.

[Create a tunnel and publish an application](https://developers.cloudflare.com/tunnel/get-started/)

---

## The Verdict

Use a Quick Tunnel for a short-lived demo or a named tunnel for a stable hostname. Configure and test Access before publishing an internal service.
