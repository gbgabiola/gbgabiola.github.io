import type { Element, Root } from 'hast';
import rehypeSlug from 'rehype-slug';
import { collectArticleSections, type Section } from './article-sections.ts';

const contentsHeading = 'article-contents-heading';

function sectionList(sections: Section[]): Element {
  return {
    type: 'element',
    tagName: 'ul',
    properties: { role: 'list' },
    children: sections.map(({ id, title, children }) => ({
      type: 'element',
      tagName: 'li',
      properties: {},
      children: [
        {
          type: 'element',
          tagName: 'a',
          properties: { href: `#${id}` },
          children: [{ type: 'text', value: title }],
        },
        ...(children.length ? [sectionList(children)] : []),
      ],
    })),
  };
}

export default function articleLayout() {
  return (
    tree: Root,
    file: { data: { astro?: { frontmatter?: { title?: string } } } },
  ) => {
    for (const node of tree.children) {
      if (node.type === 'element' && /^h[1-6]$/.test(node.tagName))
        delete node.properties.id;
    }
    rehypeSlug({ prefix: 'post-' })(tree);
    const sections = collectArticleSections(tree);

    const contents: Element[] = sections.length
      ? [
          {
            type: 'element',
            tagName: 'nav',
            properties: {
              ariaLabelledBy: [contentsHeading],
              className: ['article-contents'],
            },
            children: [
              {
                type: 'element',
                tagName: 'h2',
                properties: { id: contentsHeading },
                children: [{ type: 'text', value: 'In this post' }],
              },
              sectionList(sections),
            ],
          },
        ]
      : [];

    tree.children = tree.children.map((node) =>
      node.type === 'element' && node.tagName === 'table'
        ? ({
            type: 'element',
            tagName: 'div',
            properties: {
              className: ['table-scroll'],
              'data-scrollable-table': '',
            },
            children: [node],
          } as Element)
        : node,
    );

    tree.children = [
      {
        type: 'element',
        tagName: 'aside',
        properties: {
          className: ['article-sidebar'],
          ariaLabel: 'Article navigation',
        },
        children: [
          {
            type: 'element',
            tagName: 'a',
            properties: { href: '/blog' },
            children: [{ type: 'text', value: '← All posts' }],
          },
          {
            type: 'element',
            tagName: 'p',
            properties: { className: ['article-sidebar-title'] },
            children: [
              {
                type: 'text',
                value: file.data.astro?.frontmatter?.title || '',
              },
            ],
          },
          ...contents,
        ],
      },
      {
        type: 'element',
        tagName: 'div',
        properties: { className: ['article-body'] },
        children: tree.children.filter((node) => node.type !== 'doctype'),
      },
    ];
  };
}
