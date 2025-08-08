export function serializeRenderedDom(hostSelector: string): string {
  const host = document.querySelector(hostSelector);
  if (!host) return 'Host not found';

  const composed = host.shadowRoot
    ? host.shadowRoot.innerHTML
    : host.innerHTML;

  // Pretty print with indentation (optional)
  return composed
    .replace(/></g, '>\n<')
    .replace(/^/gm, '  ');
}
