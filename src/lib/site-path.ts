/** Convert generated file URLs to the public, extensionless page URL. */
export function sitePath(pathname: string) {
  return pathname.replace(/(?:\/index)?\.html$/, '').replace(/\/$/, '') || '/';
}
