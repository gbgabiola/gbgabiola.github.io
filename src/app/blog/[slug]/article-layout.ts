import type { Root } from 'hast';
import styles from '../page.module.css';

const contentsHeading = 'post-in-this-post';

export default function articleLayout() {
  return (tree: Root) => {
    const headingIndex = tree.children.findIndex(
      (node) => node.type === 'element' && node.properties.id === contentsHeading,
    );
    const heading = tree.children[headingIndex];
    if (heading?.type !== 'element') return;

    const listIndex = tree.children.findIndex(
      (node, index) => index > headingIndex && node.type === 'element',
    );
    const list = tree.children[listIndex];
    if (list?.type !== 'element' || list.tagName !== 'ul') return;

    list.properties.role = 'list';
    tree.children = [
      {
        type: 'element',
        tagName: 'nav',
        properties: { ariaLabelledBy: [contentsHeading], className: [styles.contents] },
        children: [heading, list],
      },
      {
        type: 'element',
        tagName: 'div',
        properties: { className: [styles.articleBody] },
        children: tree.children
          .filter((_, index) => index !== headingIndex && index !== listIndex)
          .filter((node) => node.type !== 'doctype'),
      },
    ];
  };
}
