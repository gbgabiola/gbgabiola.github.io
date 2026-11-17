import { expect, test } from '@playwright/test';

test('readers can scroll an overflowing article table with the keyboard', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/blog/how-to-force-kill-any-process-running-on-a-specific-port');

  const article = page.getByRole('article');
  const table = article.getByRole('table');
  const wrapper = table.locator('..');

  // Exercise a table wider than the mobile column while using the real renderer.
  await page.addStyleTag({ content: 'article table { min-width: 38rem; }' });
  await expect(wrapper).not.toHaveAttribute('tabindex', '0');

  await page.setViewportSize({ width: 320, height: 568 });
  const region = article.getByRole('region', { name: 'Scrollable table' });
  await expect(region).toHaveAttribute('tabindex', '0');
  await expect(region.getByRole('table')).toBeVisible();

  await article.getByRole('link', { name: 'Command line', exact: true }).focus();
  await page.keyboard.press('Tab');
  await expect(region).toBeFocused();

  await page.keyboard.press('ArrowRight');
  await expect.poll(() => region.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);

  await page.keyboard.press('Tab');
  await expect(region).not.toBeFocused();

  await page.setViewportSize({ width: 1280, height: 720 });
  await expect(region).toHaveCount(0);
  await expect(wrapper).not.toHaveAttribute('tabindex', '0');
});
