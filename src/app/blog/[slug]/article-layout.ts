import type { Element, Root } from 'hast';
import styles from '../page.module.css';
import { collectArticleSections, type Section } from './article-sections';

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
  return (tree: Root) => {
    const sections = collectArticleSections(tree);

    const contents: Element[] = sections.length ? [
      {
        type: 'element',
        tagName: 'nav',
        properties: { ariaLabelledBy: [contentsHeading], className: [styles.contents] },
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
    ] : [];

    tree.children = [
      {
        type: 'element',
        tagName: 'aside',
        properties: {},
        children: contents,
      },
      {
        type: 'element',
        tagName: 'div',
        properties: { className: [styles.articleBody] },
        children: tree.children.filter((node) => node.type !== 'doctype'),
      },
    ];
  };
}
