import { expect, test } from '@playwright/test';
import { posts } from '../src/content/posts';

test.use({ javaScriptEnabled: false });

test('portfolio navigation and every article remain readable without JavaScript', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('I’m G');
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Works', exact: true })
    .click();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Live site for Caffeinawa' }),
  ).toBeVisible();

  for (const post of posts) {
    await page.goto('/blog/' + post.slug);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      post.title,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://gbgabiola.vercel.app/blog/' + post.slug,
    );
    const contents = page.getByRole('navigation', { name: 'In this post' });
    for (const link of await contents.getByRole('link').all()) {
      const fragment = await link.getAttribute('href');
      expect(fragment).toMatch(/^#post-/);
      await expect(
        page.locator('[id="' + fragment!.slice(1) + '"]'),
      ).toHaveCount(1);
    }
  }
});
