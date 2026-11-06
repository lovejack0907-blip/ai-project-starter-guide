export function withBase(route: string, base = import.meta.env?.BASE_URL ?? '/'): string {
  if (!route.startsWith('/') || route.startsWith('//')) return route;
  return base.replace(/\/+$/, '') + route;
}
