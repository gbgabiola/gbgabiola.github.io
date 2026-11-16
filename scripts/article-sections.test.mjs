import assert from 'node:assert/strict';
import { test } from 'node:test';
import rehypeSlug from 'rehype-slug';
import { collectArticleSections } from '../src/app/blog/[slug]/article-sections.ts';

function text(value) {
  return { type: 'text', value };
}

function element(tagName, children = [], properties = {}) {
  return { type: 'element', tagName, properties, children };
}

function heading(tagName, id, label) {
  return element(tagName, [text(label)], { id });
}

test('returns no sections for empty content or ineligible headings', () => {
  assert.deepEqual(collectArticleSections({ type: 'root', children: [] }), []);
  const root = {
    type: 'root',
    children: [
      text('\n'),
      heading('h1', 'post-title', 'Title'),
      element('h2', [text('Missing identifier')]),
      heading('h2', 'post-blank', '   '),
      heading('h4', 'post-deep', 'Deep section'),
      element('blockquote', [heading('h2', 'post-quoted', 'Quoted heading')]),
    ],
  };

  assert.deepEqual(collectArticleSections(root), []);
});

test('keeps a leading H3 at the root and groups later H3s under the nearest H2', () => {
  const root = {
    type: 'root',
    children: [
      heading('h3', 'post-before', 'Before the first section'),
      heading('h2', 'post-first', 'First'),
      heading('h3', 'post-detail', 'Detail'),
      heading('h3', 'post-more', 'More detail'),
      heading('h2', 'post-second', 'Second'),
      heading('h3', 'post-other', 'Other detail'),
    ],
  };
  const original = structuredClone(root);

  assert.deepEqual(collectArticleSections(root), [
    { id: 'post-before', title: 'Before the first section', children: [] },
    {
      id: 'post-first',
      title: 'First',
      children: [
        { id: 'post-detail', title: 'Detail', children: [] },
        { id: 'post-more', title: 'More detail', children: [] },
      ],
    },
    {
      id: 'post-second',
      title: 'Second',
      children: [{ id: 'post-other', title: 'Other detail', children: [] }],
    },
  ]);
  assert.deepEqual(root, original);
});

test('keeps the distinct fragment IDs assigned to duplicate heading labels', () => {
  const root = {
    type: 'root',
    children: [element('h2', [text('Overview')]), element('h2', [text('Overview')])],
  };
  rehypeSlug({ prefix: 'post-' })(root);

  assert.deepEqual(collectArticleSections(root), [
    { id: 'post-overview', title: 'Overview', children: [] },
    { id: 'post-overview-1', title: 'Overview', children: [] },
  ]);
});

test('turns formatted heading elements into a plain-text label', () => {
  const root = {
    type: 'root',
    children: [
      element('h2', [
        text('  Using '),
        element('code', [text('git')]),
        text(' with '),
        element('em', [text('SSH')]),
        text('  '),
      ], { id: 'post-using-git-with-ssh' }),
    ],
  };

  assert.deepEqual(collectArticleSections(root), [
    { id: 'post-using-git-with-ssh', title: 'Using git with SSH', children: [] },
  ]);
});
