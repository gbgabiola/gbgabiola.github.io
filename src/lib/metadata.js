export function pageMetadata(title) {
  return {
    title: {
      absolute: `${title} | Genesis Gabiola - Software Engineer`,
    },
    openGraph: {
      title: `${title} | Genesis Gabiola`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${title} | Genesis Gabiola`,
      creator: '@gbgabiola',
    },
  };
}
