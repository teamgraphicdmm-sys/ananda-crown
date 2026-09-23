interface LoaderProps {
  src: string;
  width: number;
  quality?: number;
}

// Custom loader for `output: "export"` + GitHub Pages project sites.
// Prefixes local images with the repo basePath (e.g. /ananda-crown),
// leaves remote URLs untouched. No resizing — files served as-is from /public.
export default function imageLoader({ src }: LoaderProps): string {
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }
  const raw = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").trim().replace(/^\/+|\/+$/g, "");
  const base = raw ? `/${raw}` : "";
  return `${base}${src.startsWith("/") ? src : `/${src}`}`;
}
