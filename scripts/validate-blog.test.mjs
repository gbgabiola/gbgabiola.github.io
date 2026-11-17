import assert from 'node:assert/strict';
import { test } from 'node:test';
import { validateBlog } from './validate-blog.mjs';

const tags = { git: 'Git' };
const post = {
  slug: 'first-post',
  title: 'First post',
  date: '2024-02-29',
  summary: 'Notes on publishing.',
  tags: ['git'],
};
const files = new Map([['first-post.md', '## Intro']]);

test('accepts a published post with a matching Markdown file and a valid leap day', () => {
  assert.deepEqual(validateBlog([post], tags, files), []);
});

test('rejects duplicate and unsafe slugs', () => {
  assert.deepEqual(validateBlog([post, post, { ...post, slug: '../../private' }], tags, files), [
    'Post "first-post": duplicate slug',
    'Post "../../private": use lowercase letters, digits, and single hyphens for the slug',
  ]);
});

test('rejects impossible dates, blank metadata, and invalid tags', () => {
  const invalid = {
    ...post,
    date: '2026-02-30',
    title: ' ',
    summary: '',
    tags: ['toString', 'git', 'git'],
  };
  assert.deepEqual(validateBlog([invalid], tags, files), [
    'Post "first-post": title is blank',
    'Post "first-post": summary is blank',
    'Post "first-post": "2026-02-30" is not a valid YYYY-MM-DD date',
    'Post "first-post": unknown tag "toString"',
    'Post "first-post": duplicate tag "git"',
  ]);
});

test('requires date-only ISO syntax and at least one tag', () => {
  assert.deepEqual(validateBlog([{ ...post, date: '2024-2-29', tags: [] }], tags, files), [
    'Post "first-post": "2024-2-29" is not a valid YYYY-MM-DD date',
    'Post "first-post": add at least one tag',
  ]);
});

test('reports missing, blank, and unregistered Markdown files together', () => {
  const anotherPost = { ...post, slug: 'second-post' };
  const mismatchedFiles = new Map([['first-post.md', '  \n'], ['unregistered.md', '## Intro']]);
  assert.deepEqual(validateBlog([post, anotherPost], tags, mismatchedFiles), [
    'first-post.md: Markdown file is blank',
    'second-post.md: missing Markdown file',
    'unregistered.md: has no matching post in the catalog',
  ]);
});
