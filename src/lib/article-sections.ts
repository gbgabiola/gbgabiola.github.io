import type { Root } from 'hast';
import { toString } from 'hast-util-to-string';

export type Section = {
  id: string;
  title: string;
  children: Section[];
};

export function collectArticleSections(tree: Root): Section[] {
  const sections: Section[] = [];
  let parent: Section | undefined;

  for (const node of tree.children) {
    if (node.type !== 'element' || (node.tagName !== 'h2' && node.tagName !== 'h3')) continue;

    const id = node.properties.id;
    const title = toString(node).trim();
    if (typeof id !== 'string' || !title) continue;

    const section: Section = { id, title, children: [] };
    if (node.tagName === 'h3' && parent) {
      parent.children.push(section);
    } else {
      sections.push(section);
    }
    if (node.tagName === 'h2') parent = section;
  }

  return sections;
}
