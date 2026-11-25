import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const viewportSizes = [
  { width: 1440, height: 900 },
  { width: 1280, height: 720 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
  { width: 360, height: 640 },
  { width: 320, height: 568 },
  { width: 844, height: 390 },
];

for (const viewport of viewportSizes) {
  test(`Home and Contact fit at ${viewport.width}×${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);

    for (const path of ['/', '/contact']) {
      await page.goto(path);
      await expect(page.locator('h1')).toBeVisible();
      const documentSize = await page.evaluate(() => ({
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight,
      }));
      expect(documentSize.width, `${path} document width`).toBeLessThanOrEqual(viewport.width);
      expect(documentSize.height, `${path} document height`).toBeLessThanOrEqual(viewport.height);
    }
  });
}

test('footer links to Home, GitHub, and Contact without a version label', async ({ page }) => {
  await page.goto('/contact');
  const footer = page.getByRole('contentinfo');
  const home = footer.getByRole('link', { name: 'gbgabiola' });
  const links = footer.getByRole('navigation', { name: 'Footer' });

  await expect(footer).toContainText(/© 2018–\d{4} gbgabiola/);
  await expect(home).toHaveAttribute('href', '/');
  await expect(links.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/gbgabiola');
  await expect(links.getByRole('link', { name: 'Articles', exact: true })).toHaveAttribute('href', '/blog');
  await expect(links.getByRole('link', { name: 'Get in touch' })).toHaveAttribute('href', '/contact');
  await expect(footer).not.toContainText(/Portfolio v\d+\.\d+\.\d+/);

  await home.click();
  await expect(page).toHaveURL('/');
});

test('Contact shows icons and the original account names', async ({ page }) => {
  await page.goto('/contact');
  const contact = page.getByRole('region', { name: 'Get in touch' });
  await expect(contact.locator('svg[aria-hidden="true"]')).toHaveCount(4);

  for (const [label, username] of [
    ['LinkedIn', 'gbgabiola'],
    ['Twitter', '@gbgabiola'],
    ['GitHub', 'gbgabiola'],
  ]) {
    await expect(contact.getByRole('link', { name: `${label}: ${username}` })).toHaveText(username);
  }
});

test('keyboard users can skip the header and open the Works page', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('main')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Open to part-time work' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'View work' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('/works');
});

test('header navigation sits beside the system theme indicator and the brand returns home', async ({ page }) => {
  await page.goto('/about');
  const header = page.getByRole('banner');
  const nav = header.getByRole('navigation', { name: 'Main navigation' });
  const brand = header.getByRole('link', { name: 'G home' });
  const theme = header.getByRole('img', { name: 'System theme' });

  await expect(nav.getByRole('link', { name: 'Home', exact: true })).toHaveCount(0);
  for (const viewport of [{ width: 1280, height: 720 }, { width: 320, height: 568 }]) {
    await page.setViewportSize(viewport);
    const [brandBox, navBox, themeBox] = await Promise.all([
      brand.boundingBox(),
      nav.boundingBox(),
      theme.boundingBox(),
    ]);
    if (!brandBox || !navBox || !themeBox) throw new Error('Header controls are missing');
    expect(brandBox.x + brandBox.width).toBeLessThan(navBox.x);
    expect(navBox.x + navBox.width).toBeLessThan(themeBox.x);
    expect(Math.abs(navBox.y + navBox.height / 2 - themeBox.y - themeBox.height / 2)).toBeLessThan(2);
  }

  await brand.click();
  await expect(page).toHaveURL('/');
  await expect(nav.locator('a[aria-current]')).toHaveCount(0);
});

test('main navigation identifies the current page or blog section', async ({ page }) => {
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  const activeLink = nav.locator('a[aria-current]');
  await expect(activeLink).toHaveCount(0);

  for (const [label, path] of [
    ['About', '/about'],
    ['Works', '/works'],
    ['Contact', '/contact'],
    ['Blog', '/blog'],
  ]) {
    await nav.getByRole('link', { name: label, exact: true }).click();
    await expect(page).toHaveURL(path);
    await expect(activeLink).toHaveAttribute('href', path);
    await expect(activeLink).toHaveAttribute('aria-current', 'page');
  }

  for (const path of [
    '/blog/ensuring-persistent-ssh-agent-windows-git-bash',
    '/blog/tags',
    '/blog/tags/git',
  ]) {
    await page.goto(path);
    await expect(activeLink).toHaveAttribute('href', '/blog');
    await expect(activeLink).toHaveAttribute('aria-current', 'location');
  }
});

for (const initialScheme of ['light', 'dark'] as const) {
  test('theme follows the system and ignores saved overrides in ' + initialScheme + ' mode', async ({ page }) => {
    const alternateScheme = initialScheme === 'dark' ? 'light' : 'dark';
    await page.emulateMedia({ colorScheme: initialScheme });
    await page.addInitScript((savedTheme) => localStorage.setItem('theme', savedTheme), alternateScheme);
    await page.goto('/');
    const indicator = page.getByRole('img', { name: 'System theme' });

    for (const scheme of [initialScheme, alternateScheme]) {
      await page.emulateMedia({ colorScheme: scheme });
      await expect(page.locator('html')).toHaveCSS('color-scheme', scheme);
      await expect(page.locator('body')).toHaveCSS('background-color',
        scheme === 'dark' ? 'rgb(23, 27, 33)' : 'rgb(250, 250, 248)');
      await expect.poll(() => indicator.evaluate((element) => {
        const transform = getComputedStyle(element, '::before').transform;
        return new DOMMatrixReadOnly(transform).m41 > 0;
      })).toBe(scheme === 'dark');
    }

    await page.getByRole('link', { name: 'Contact', exact: true }).click();
    await expect(page).toHaveURL('/contact');
    await page.reload();
    await expect(page.locator('html')).toHaveCSS('color-scheme', alternateScheme);
    await expect(page.locator('body')).toHaveCSS('background-color',
      alternateScheme === 'dark' ? 'rgb(23, 27, 33)' : 'rgb(250, 250, 248)');
  });

  test('system theme works without JavaScript in ' + initialScheme + ' mode', async ({ browser, baseURL }) => {
    const context = await browser.newContext({
      baseURL,
      javaScriptEnabled: false,
      colorScheme: initialScheme,
    });
    try {
      const page = await context.newPage();
      await page.goto('/');
      await expect(page.locator('html')).toHaveCSS('color-scheme', initialScheme);
      await expect(page.locator('body')).toHaveCSS('background-color',
        initialScheme === 'dark' ? 'rgb(23, 27, 33)' : 'rgb(250, 250, 248)');
      await expect(page.getByRole('img', { name: 'System theme' })).toBeVisible();
    } finally {
      await context.close();
    }
  });
}

test('system theme indicator remains distinguishable with forced colors and reduced motion', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active', reducedMotion: 'reduce', colorScheme: 'dark' });
  await page.goto('/');
  const indicator = page.getByRole('img', { name: 'System theme' });

  for (const scheme of ['dark', 'light'] as const) {
    await page.emulateMedia({ colorScheme: scheme });
    await expect.poll(() => page.evaluate(() =>
      matchMedia('(prefers-color-scheme: dark)').matches)).toBe(scheme === 'dark');
    const styles = await indicator.evaluate((element) => {
      const thumb = getComputedStyle(element, '::before');
      const dark = matchMedia('(prefers-color-scheme: dark)').matches;
      const icon = element.querySelectorAll('svg')[dark ? 1 : 0];
      return {
        thumbAdjustment: thumb.forcedColorAdjust,
        thumbColor: thumb.backgroundColor,
        iconAdjustment: getComputedStyle(icon).forcedColorAdjust,
        iconColor: getComputedStyle(icon).color,
        transitionDuration: thumb.transitionDuration,
      };
    });
    expect(styles.thumbAdjustment).toBe('none');
    expect(styles.iconAdjustment).toBe('none');
    expect(styles.thumbColor).not.toBe('rgba(0, 0, 0, 0)');
    expect(styles.iconColor).not.toBe(styles.thumbColor);
    expect(styles.transitionDuration).toBe('0s');
  }
});

test('blog posts link to the author, headings, and tag archives', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('/blog/ensuring-persistent-ssh-agent-windows-git-bash');

  const article = page.getByRole('article');
  await expect(article.getByRole('link', { name: 'gbgabiola' })).toHaveAttribute('href', '/about');
  await expect(article.getByRole('link', { name: 'All posts', exact: false })).toHaveAttribute('href', '/blog');

  const breadcrumb = article.getByRole('navigation', { name: 'Breadcrumb' });
  await expect(breadcrumb.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  await expect(breadcrumb.getByRole('link', { name: 'Tags' })).toHaveAttribute('href', '/blog/tags');
  const sidebar = article.getByRole('complementary', { name: 'Article navigation' });
  const contents = sidebar.getByRole('navigation', { name: 'In this post' });
  const opening = article.getByRole('heading', { name: 'Introduction', exact: true });
  await expect(sidebar).toBeHidden();
  await expect(opening).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);

  await page.setViewportSize({ width: 1280, height: 540 });
  await expect(contents).toBeVisible();
  await expect(contents.getByRole('list')).toHaveCSS('list-style-type', 'none');
  await expect(contents.getByRole('link', { name: 'Introduction', exact: true }))
    .toHaveAttribute('href', '#post-introduction');
  const backLink = sidebar.getByRole('link', { name: 'All posts', exact: false });
  const title = article.getByRole('heading', { level: 1 });
  const repeatedTitle = sidebar.getByText(await title.innerText(), { exact: true });
  await expect(backLink).toHaveAttribute('href', '/blog');

  const [desktopSidebar, desktopOpening, desktopTitle, desktopBack, desktopRepeated, desktopContents] =
    await Promise.all([sidebar, opening, title, backLink, repeatedTitle, contents].map((part) => part.boundingBox()));
  if (!desktopSidebar || !desktopOpening || !desktopTitle || !desktopBack || !desktopRepeated || !desktopContents) {
    throw new Error('Article layout is missing');
  }
  expect(desktopSidebar.x).toBeGreaterThan(desktopOpening.x + desktopOpening.width);
  expect(desktopSidebar.y).toBeLessThan(desktopTitle.y);
  expect(desktopBack.y).toBeLessThan(desktopRepeated.y);
  expect(desktopRepeated.y).toBeLessThan(desktopContents.y);

  const stickyTop = await sidebar.evaluate((element) => Number.parseFloat(getComputedStyle(element).top));
  await page.evaluate(({ start, offset }) => window.scrollTo(0, start - offset + 72), {
    start: desktopSidebar.y,
    offset: stickyTop,
  });
  await expect.poll(async () => (await sidebar.boundingBox())?.y).toBeCloseTo(stickyTop, 0);

  await contents.getByRole('link', { name: 'Step 3: Automate SSH-Agent Launch' }).click();
  await expect(page).toHaveURL(/#post-step-3-automate-ssh-agent-launch$/);
  await expect(article.getByRole('heading', { name: 'Step 3: Automate SSH-Agent Launch' }))
    .toHaveAttribute('id', 'post-step-3-automate-ssh-agent-launch');

  await article.locator('header').getByRole('link', { name: 'Git', exact: true }).click();
  await expect(page).toHaveURL('/blog/tags/git');
  await expect(page.getByRole('heading', { name: 'Posts tagged Git' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Ensuring Persistent SSH-Agent on Windows with Git Bash' }))
    .toHaveAttribute('href', '/blog/ensuring-persistent-ssh-agent-windows-git-bash');
  await page.getByRole('navigation', { name: 'Breadcrumb' }).getByRole('link', { name: 'Tags' }).click();
  await expect(page).toHaveURL('/blog/tags');
  await expect(page.getByRole('link', { name: 'Windows' })).toHaveAttribute('href', '/blog/tags/windows');
});

test('portfolio routes pass automated accessibility checks', async ({ page }) => {
  for (const path of ['/', '/about', '/works', '/contact', '/blog', '/blog/ensuring-persistent-ssh-agent-windows-git-bash']) {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations, path).toEqual([]);
  }
});
