# James Mills Paquin — Career Portfolio

A static-exported Next.js portfolio for GitHub Pages.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- shadcn/ui primitives
- Motion for small interface transitions
- GSAP ScrollTrigger for the World Cup dashboard walkthrough
- Native browser scrolling — no Lenis
- Geist (UI) and Newsreader (editorial serif) self-hosted through `next/font`

## Run locally

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validate the production build

```powershell
npm run build
```

Next.js writes the static site to `out/`.

## Publish with GitHub Pages

1. Push this directory to the `main` branch of a GitHub repository.
2. In **Settings → Pages**, choose **GitHub Actions** as the source.
3. The included workflow installs dependencies, builds the static export, and deploys `out/`.

The workflow passes GitHub Pages' reported base path into the Next.js build, so it works both at a repository URL and after a custom domain is connected.

## Custom domain

The production domain is `millspaquin.com`. Verify it at the GitHub account level, then set it under the repository's **Settings → Pages** before changing the Namecheap DNS records. With the included Actions deployment, a repository `CNAME` file is not required.

## Content notes

- Public contact information intentionally omits the phone number and ZIP code.
- The résumé is served as `public/assets/James-Mills-Paquin-Resume.pdf`. Its editable Word source stays local and is intentionally excluded from the public repository. After editing it, re-export the PDF into `public/assets/`, keeping the filename stable.
