const configuredBasePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "")
  .trim()
  .replace(/^\/+|\/+$/g, "");

export const basePath = configuredBasePath ? `/${configuredBasePath}` : "";

/**
 * Prefixes files from `public` with the path GitHub Pages assigns to a
 * repository site. Absolute URLs, fragments, and query strings pass through.
 */
export function assetPath(path: string) {
  if (!path) return basePath || "/";
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#|\?)/i.test(path)) return path;

  const normalizedPath = `/${path.replace(/^\/+/, "")}`;

  if (
    basePath &&
    (normalizedPath === basePath || normalizedPath.startsWith(`${basePath}/`))
  ) {
    return normalizedPath;
  }

  return `${basePath}${normalizedPath}`;
}
