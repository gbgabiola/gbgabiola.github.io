When I moved this portfolio from Gatsby to Next.js, I wanted visitors to see who I am, what I build, and where to go next as soon as they open the site. Home and Contact each have a short job. About and Works have more room for experience and project details.

## Give the layout a minimum height

The site uses a column layout with a minimum height of one small viewport. The header and footer take the space they need, and the main area fills the space between them. That keeps short pages balanced without fixing their height.

```css
body {
  display: flex;
  flex-direction: column;
  min-height: 100svh;
}

main {
  flex: 1;
}
```

On narrow screens, the portrait gets smaller and the projects become text links. Screen space goes to the same actions a visitor would have on a desktop. If someone increases their text size or uses a shorter screen, the page can still scroll.

## Test the edges

A layout that fits at desktop width can gain a line when a button wraps on a narrow phone. I check both pages at desktop, tablet, and phone sizes, including narrow portrait and short landscape. The browser tests compare the document dimensions with the viewport. Separate checks cover keyboard navigation and theme persistence.

You can try the layout on [Home](/) and [Contact](/contact).
