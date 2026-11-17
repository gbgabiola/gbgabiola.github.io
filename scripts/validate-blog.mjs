import { readdirSync, readFileSync } from 'node:fs';

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isCalendarDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const date = new Date(value + 'T00:00:00.000Z');
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

export function validateBlog(posts, blogTags, markdownFiles) {
  const errors = [];
  const expectedFiles = new Set();

  for (const { slug, title, date, summary, tags } of posts) {
    const label = 'Post ' + JSON.stringify(slug);

    if (slugPattern.test(slug)) {
      const filename = slug + '.md';
      if (expectedFiles.has(filename)) errors.push(label + ': duplicate slug');
      expectedFiles.add(filename);
    } else {
      errors.push(label + ': use lowercase letters, digits, and single hyphens for the slug');
    }

    if (!title.trim()) errors.push(label + ': title is blank');
    if (!summary.trim()) errors.push(label + ': summary is blank');
    if (!isCalendarDate(date)) {
      errors.push(label + ': ' + JSON.stringify(date) + ' is not a valid YYYY-MM-DD date');
    }

    const seenTags = new Set();
    if (!tags.length) errors.push(label + ': add at least one tag');
    for (const tag of tags) {
      if (!Object.hasOwn(blogTags, tag)) errors.push(label + ': unknown tag ' + JSON.stringify(tag));
      if (seenTags.has(tag)) errors.push(label + ': duplicate tag ' + JSON.stringify(tag));
      seenTags.add(tag);
    }
  }

  for (const filename of expectedFiles) {
    if (!markdownFiles.has(filename)) {
      errors.push(filename + ': missing Markdown file');
    } else if (!markdownFiles.get(filename).trim()) {
      errors.push(filename + ': Markdown file is blank');
    }
  }

  for (const filename of markdownFiles.keys()) {
    if (!expectedFiles.has(filename)) errors.push(filename + ': has no matching post in the catalog');
  }

  return errors;
}

if (import.meta.main) {
  const { blogTags, posts } = await import('../src/content/posts.ts');
  const directory = new URL('../src/content/blog/', import.meta.url);
  const files = new Map();

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (!entry.isFile() || !/\.md$/i.test(entry.name)) continue;

    const file = new URL(encodeURIComponent(entry.name), directory);
    files.set(entry.name, readFileSync(file, 'utf8'));
  }

  const errors = validateBlog(posts, blogTags, files);
  if (errors.length) {
    console.error(['Blog validation failed:', ...errors.map((error) => '- ' + error)].join('\n'));
    process.exitCode = 1;
  } else {
    console.log('Validated ' + posts.length + ' blog posts.');
  }
}
