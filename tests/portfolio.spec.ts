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

test('footer shows the portfolio copyright and brand link', async ({ page }) => {
  await page.goto('/');
  const footer = page.getByRole('contentinfo');
  await expect(footer).toContainText(/© 2018–\d{4} gbgabiola/);
  await expect(footer.getByRole('link', { name: 'gbgabiola' }))
    .toHaveAttribute('href', 'https://github.com/gbgabiola');
  await expect(footer).toContainText(/Portfolio v\d+\.\d+\.\d+/);
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

test('header navigation sits beside the theme switch and the brand returns home', async ({ page }) => {
  await page.goto('/about');
  const header = page.getByRole('banner');
  const nav = header.getByRole('navigation', { name: 'Main navigation' });
  const brand = header.getByRole('link', { name: 'G home' });
  const theme = header.getByRole('button', { name: 'Dark mode' });

  await expect(nav.getByRole('link', { name: 'Home', exact: true })).toHaveCount(0);
  await expect(nav.getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page');
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
});

test('theme persists across navigation and reload', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  const theme = page.getByRole('button', { name: 'Dark mode' });
  await expect(theme).toHaveAttribute('aria-pressed', 'true');
  await theme.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(theme).toHaveAttribute('aria-pressed', 'false');
  await page.getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(page).toHaveURL('/contact');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(theme).toHaveAttribute('aria-pressed', 'false');
  await theme.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('blog posts link to the author, headings, and tag archives', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('/blog/portfolio-pages-that-fit');

  const article = page.getByRole('article');
  await expect(article.getByRole('link', { name: 'gbgabiola' })).toHaveAttribute('href', '/about');
  await expect(article.getByRole('link', { name: 'All posts', exact: false })).toHaveAttribute('href', '/blog');

  const breadcrumb = article.getByRole('navigation', { name: 'Breadcrumb' });
  await expect(breadcrumb.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  await expect(breadcrumb.getByRole('link', { name: 'Tags' })).toHaveAttribute('href', '/blog/tags');
  const contents = article.getByRole('navigation', { name: 'In this post' });
  const opening = article.getByText('When I moved this portfolio', { exact: false });
  await expect(contents).toBeHidden();
  await expect(opening).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);

  await page.setViewportSize({ width: 1280, height: 540 });
  await expect(contents).toBeVisible();
  await expect(contents.getByRole('list')).toHaveCSS('list-style-type', 'none');
  const desktopContents = await contents.boundingBox();
  const desktopOpening = await opening.boundingBox();
  if (!desktopContents || !desktopOpening) throw new Error('Article layout is missing');
  expect(desktopContents.x).toBeGreaterThan(desktopOpening.x + desktopOpening.width);
  expect(Math.abs(desktopContents.y - desktopOpening.y)).toBeLessThan(2);

  const stickyTop = await contents.evaluate((element) => Number.parseFloat(getComputedStyle(element).top));
  await page.evaluate(({ start, offset }) => window.scrollTo(0, start - offset + 72), {
    start: desktopContents.y,
    offset: stickyTop,
  });
  await expect.poll(async () => (await contents.boundingBox())?.y).toBeCloseTo(stickyTop, 0);

  await contents.getByRole('link', { name: 'Test the edges' }).click();
  await expect(page).toHaveURL(/#post-test-the-edges$/);
  await expect(article.getByRole('heading', { name: 'Test the edges' }))
    .toHaveAttribute('id', 'post-test-the-edges');

  await article.getByRole('link', { name: 'CSS', exact: true }).click();
  await expect(page).toHaveURL('/blog/tags/css');
  await expect(page.getByRole('heading', { name: 'Posts tagged CSS' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Designing portfolio pages to fit the viewport' }))
    .toHaveAttribute('href', '/blog/portfolio-pages-that-fit');
  await page.getByRole('navigation', { name: 'Breadcrumb' }).getByRole('link', { name: 'Tags' }).click();
  await expect(page).toHaveURL('/blog/tags');
  await expect(page.getByRole('link', { name: 'Accessibility' })).toHaveAttribute('href', '/blog/tags/accessibility');
});

test('portfolio routes pass automated accessibility checks', async ({ page }) => {
  for (const path of ['/', '/about', '/works', '/contact', '/blog', '/blog/portfolio-pages-that-fit']) {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations, path).toEqual([]);
  }
});
