# Ananda Crown

The live site is the static design in `public/ananda_crown_clone.html`. `index.html` and the root asset folders are its standalone Apache/local-editing mirror. Keep both copies in sync. The Next.js source remains available through `npm run dev:react` and provides the exported privacy route.

## Development and production

- `npm run dev`: preview the live static design at http://localhost:3000.
- `npm run build`: validate local assets, clear only the generated `out/` directory, build Next.js, publish the static home/contact pages, and minify the exported CSS and JavaScript (including inline code). Source files stay readable. Exported static assets receive content-version query strings so browser caches can pick up new deployments.
- `npm run preview`: serve the production `out/` directory at http://localhost:8080 with gzip, ETags and cache headers.
- Deploy **only `out/`**. GitHub Actions runs the complete build automatically. Do not run `export-clone.js` again after the build: that would replace the minified home page.
- GitHub Pages project paths use `NEXT_BASE_PATH` and `NEXT_PUBLIC_BASE_PATH`, set by the workflow. Set the same variables when previewing a project-path build locally.

Apache hosting can use the included `out/.htaccess` for compression and caching. GitHub Pages manages its own response headers.

## Images and animation

Large photographs and transparent illustrations use optimized WebP files. HTML images include intrinsic dimensions, asynchronous decoding, and responsive sources where useful. The first hero image has high priority; images further down the site load lazily.

The hero retains all 169 original animation positions. Desktop and mobile frame sizes are separate. The loader requests nearby frames with at most three requests in flight and retains at most 36 desktop / 20 mobile decoded frames. It pauses idle work and respects reduced motion and data-saving preferences. The previous full-video download and fixed loading-screen delay are removed from the live home page.

GSAP and the existing main fonts are local, with their existing versions and license headers retained. Font license files remain alongside the fonts.

## Asset maintenance

- `npm run optimize:images`: optimize newly added referenced images and prepare responsive image tags. To regenerate the hero, supply the original JPEG frames in `public/videos/hero-frames/` before running this command.
- `npm run check:assets`: check image, script, font, CSS, and srcset paths.
- `npm run audit:assets`: report assets not referenced by any HTML entry point, CSS, JavaScript, or the Next.js source. This does not delete anything.
- `node scripts/audit-assets.cjs --clean`: delete the reported unused assets and matching root copies after reviewing the report.

Reference folders, including `refe/`, are excluded from cleanup. Root/public duplicates needed by the two preview modes are retained. `scripts/image-optimization.json` and `scripts/asset-cleanup.json` record the optimization and cleanup results.

The existing inquiry/contact forms currently prevent submission and have no configured delivery backend. Performance optimization does not add a form service.
