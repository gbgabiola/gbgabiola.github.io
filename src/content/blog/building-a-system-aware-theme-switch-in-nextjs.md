---
title: "Building a System-Aware Theme Switch in Next.js"
date: "2026-11-21"
summary: "Build a sun and moon theme switch with next-themes, system defaults, saved choices, and accessible styling."
tags: ["nextjs"]
---

The Next.js version of this portfolio starts with the visitor's system appearance and lets them choose a different theme with the sun/moon switch. That choice survives navigation and reloads. This guide walks through the same Next.js App Router implementation, including the teal pill, hydration handling, and accessibility styles.

The examples assume an existing Next.js application with React, TypeScript, CSS Modules, and the `@/` import alias pointing to `src/`. That version uses `next-themes` 0.4.6.

## Define the theme behavior

A fresh browser uses the system preference. While the selected theme is `system`, operating-system appearance changes update the site. Clicking the switch selects `light` or `dark` explicitly and persists that choice.

The two-position switch has no visible “System” option. To return to automatic behavior in your own interface, provide an action that calls `setTheme('system')`. Clearing the site's saved theme also restores the default on the next load.

## Install next-themes

Run this command from the application directory.

```sh
npm install next-themes@0.4.6
```

The library manages storage, system preference detection, and synchronization between tabs. Its initialization script applies the theme before hydration. [next-themes documentation](https://github.com/pacocoursey/next-themes#readme)

## Add a client-side provider

Save the provider in `src/components/theme/theme-provider.tsx`.

```tsx
'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';

export default function PortfolioThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
    >
      {children}
    </ThemeProvider>
  );
}
```

`defaultTheme="system"` supplies the initial choice when no saved value exists. `enableSystem` allows system preference detection. `attribute="data-theme"` connects the selected appearance to our CSS.

Wrap the application in `src/app/layout.tsx`. Keep your existing metadata and other layout content when adding this provider around the page content.

```tsx
import type { ReactNode } from 'react';
import PortfolioThemeProvider from '@/components/theme/theme-provider';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <PortfolioThemeProvider>{children}</PortfolioThemeProvider>
      </body>
    </html>
  );
}
```

The provider changes the root element's theme attribute in the browser. The suppression applies to that element; theme-dependent component markup still needs hydration handling. [App Router setup](https://github.com/pacocoursey/next-themes#with-app)

## Define the light and dark palettes

Add these variables to `src/app/globals.css` and import that file from your root layout.

```css
:root {
  color-scheme: dark;
  --background: #171b21;
  --surface: #20262f;
  --foreground: #f3f5f7;
  --muted: #b1bbc8;
  --primary: #5fe2d1;
  --border: #46515e;
}

:root[data-theme='light'] {
  color-scheme: light;
  --background: #fafaf8;
  --surface: #fff;
  --foreground: #1b2530;
  --muted: #4f5d6c;
  --primary: #006a60;
  --border: #cbd2d8;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--background);
  color: var(--foreground);
}

:focus-visible {
  outline: 3px solid var(--primary);
  outline-offset: 4px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
```

Components share the same palette through custom properties. The switch uses the teal accent for its selected thumb.

These palettes depend on the provider applying `data-theme`. With JavaScript disabled, this implementation retains the CSS dark fallback.

## Build the sun and moon switch

Save the switch in `src/components/theme/theme-switch.tsx`.

```tsx
'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import styles from './theme-switch.module.css';

const subscribe = () => () => {};

export default function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  // The saved theme is available only in the browser.
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const dark = !hydrated || resolvedTheme !== 'light';

  return (
    <button
      className={styles.toggle}
      type="button"
      aria-label="Dark mode"
      aria-pressed={dark}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setTheme(dark ? 'light' : 'dark')}
    >
      <svg
        className={styles.sun}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
      </svg>
      <svg
        className={styles.moon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M20.5 15A8.5 8.5 0 0 1 9 3.5 8.5 8.5 0 1 0 20.5 15Z" />
      </svg>
    </button>
  );
}
```

`resolvedTheme` gives the effective light or dark appearance, including when the saved choice is `system`. The click handler chooses its opposite.

The server cannot read the visitor's stored preference. `useSyncExternalStore` supplies a stable server snapshot and initial hydration snapshot, then exposes the client snapshot. Here the subscription is intentionally empty because it only marks the hydration boundary. Theme updates come from `useTheme`.

The initial button markup uses a dark fallback. Once hydrated, its pressed state and title reflect the resolved appearance. The provider's early theme script controls the page palette separately. [React server-rendering guidance](https://react.dev/reference/react/useSyncExternalStore#adding-support-for-server-rendering)

The native button supports Enter and Space. Its accessible name stays “Dark mode,” and `aria-pressed` communicates whether dark mode is active. The SVGs are decorative.

## Style the responsive pill

Save the switch styles in `src/components/theme/theme-switch.module.css`.

```css
.toggle {
  --segment: 2.3rem;
  --thumb: 2.125rem;
  --track-padding: 0.25rem;

  position: relative;
  isolation: isolate;
  display: inline-grid;
  grid-template-columns: repeat(2, var(--segment));
  place-items: center;
  flex: none;
  min-height: 2.75rem;
  padding: var(--track-padding);
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  color: var(--muted);
  cursor: pointer;
}

.toggle:hover {
  border-color: var(--primary);
}

.toggle::before {
  position: absolute;
  z-index: -1;
  top: 50%;
  left: calc(var(--track-padding) + (var(--segment) - var(--thumb)) / 2);
  width: var(--thumb);
  height: var(--thumb);
  border-radius: 50%;
  background: var(--primary);
  content: '';
  transform: translateY(-50%);
  transition: transform 160ms ease;
}

:global([data-theme='dark']) .toggle::before {
  transform: translate(var(--segment), -50%);
}

.toggle svg {
  width: 1.25rem;
  height: 1.25rem;
}

:global([data-theme='light']) .sun,
:global([data-theme='dark']) .moon {
  color: var(--background);
}

@media (max-width: 640px) {
  .toggle {
    --segment: 1.75rem;
    --thumb: 1.625rem;

    min-height: 2.25rem;
  }

  .toggle svg {
    width: 1rem;
    height: 1rem;
  }
}

@media (forced-colors: active) {
  .toggle::before {
    forced-color-adjust: none;
    background: Highlight;
  }

  :global([data-theme='light']) .sun,
  :global([data-theme='dark']) .moon {
    forced-color-adjust: none;
    color: HighlightText;
  }
}
```

The thumb moves to the moon under the dark theme. At narrow widths, the switch uses smaller segments and icons so the header has more room. The global reduced-motion rule disables the transition when requested.

Forced-color mode uses system highlight colors for the selected thumb and icon. Keep the focus outline in the global styles so keyboard users can locate the control.

## Place the switch in the header

Render the switch in a header within the provider.

```tsx
import ThemeSwitch from '@/components/theme/theme-switch';

export default function SiteHeader() {
  return (
    <header>
      <nav aria-label="Main navigation">
        {/* Your navigation links */}
      </nav>
      <ThemeSwitch />
    </header>
  );
}
```

Use the existing header's layout rules to position it beside navigation. Check the smallest supported viewport after adding it.

## Verify the behavior

Start the checks with fresh storage, then select a theme explicitly.

1. Start with a light system preference and confirm the page loads light.
2. Change the system preference to dark while the page remains open. Confirm the page follows it.
3. Click the switch to choose light. Reload and navigate to another page. Confirm the manual choice persists.
4. Change the system preference again. Confirm the explicit choice remains active.
5. Reach the switch with Tab and activate it with Space or Enter.
6. Check both themes with reduced motion and forced colors enabled.
7. Inspect the console for hydration warnings and check header fit on a small screen.

For a repeatable browser test, emulate `colorScheme` with Playwright and use a fresh browser context to avoid an earlier saved choice. The portfolio's tests cover system changes before an override, saved manual preferences, keyboard access, and viewport fit.

## Maintaining the implementation

Keep the provider near the root, use `resolvedTheme` for the switch, and let the library manage the saved preference. If you later add a system-reset action, verify that it resumes following operating-system changes.

The complete portfolio implementation is available in the project repository. [Portfolio source](https://github.com/gbgabiola/gbgabiola.github.io)
