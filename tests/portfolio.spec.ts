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

test('theme persists across navigation and reload', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Switch to light' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(page).toHaveURL('/contact');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('portfolio routes pass automated accessibility checks', async ({ page }) => {
  for (const path of ['/', '/about', '/works', '/contact']) {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations, path).toEqual([]);
  }
});
