import type { Element, Root } from 'hast';
import { toString } from 'hast-util-to-string';
import styles from '../page.module.css';

type Section = {
  id: string;
  title: string;
  children: Section[];
};

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
    const sections: Section[] = [];
    let parent: Section | undefined;

    for (const node of tree.children) {
      if (node.type !== 'element' || (node.tagName !== 'h2' && node.tagName !== 'h3')) continue;

      const id = node.properties.id;
      const title = toString(node).trim();
      if (typeof id !== 'string' || !title) continue;

      const section = { id, title, children: [] };
      if (node.tagName === 'h3' && parent) {
        parent.children.push(section);
      } else {
        sections.push(section);
      }
      if (node.tagName === 'h2') parent = section;
    }

    if (!sections.length) return;

    tree.children = [
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
      {
        type: 'element',
        tagName: 'div',
        properties: { className: [styles.articleBody] },
        children: tree.children.filter((node) => node.type !== 'doctype'),
      },
    ];
  };
}
