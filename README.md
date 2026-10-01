# Prep Kitchen

A personal meal-prep cookbook built with Next.js. It currently contains one recipe: creamy peri-peri soy chunks with rice, broccoli and sauce. The site gives you a scalable ingredient list, a staged cooking plan with timers, and storage and nutrition guidance.

## How the site works

- `lib/recipes.ts` holds the recipe data and quantity scaling. The default batch is five meals; quantities scale from that baseline.
- `app/page.tsx` lists the recipes. `app/recipes/[slug]/page.tsx` creates one page per known recipe slug at build time.
- `components/recipe/companion.tsx` runs the interactive ingredient checklist, preferences, cooking progress and timers in the browser. It saves each recipe's session in that browser's `localStorage`. There is no account or database, so progress does not sync across devices.
- `public/` contains the image and favicon. `lib/assets.ts` adds the GitHub Pages path to public image URLs.
- `next.config.ts` switches to a static export when `GITHUB_PAGES=true`. That creates an `out/` folder of HTML, JavaScript, CSS and images. GitHub Pages serves those files; it does not run a Next.js server.
- `.github/workflows/deploy-pages.yml` builds the static export and publishes it to GitHub Pages. The workflow runs on pushes to this repository's `master` branch or when started manually.

The recipe companion and homepage still contain some text and layout assumptions specific to the first recipe. Adding another object to `lib/recipes.ts` creates its route and card, but you should also review the hero copy, image descriptions, meal-plan text, nutrition assumptions and storage instructions before publishing a different recipe.

Next.js generates `AGENTS.md` and `CLAUDE.md` when an AI coding agent runs the development server. They point coding agents to the documentation bundled with the installed Next.js version. Keep them with the source if you use AI coding tools; they are not part of the published website.

## Run locally on Windows

Use Node.js 22.13 or newer and pnpm 11.25.0. Open PowerShell in the repository root, `D:\Projects\prep-kitchen`:

```powershell
node --version
npm install --global pnpm@11.25.0
pnpm --version
pnpm install --frozen-lockfile
pnpm dev
```

Open the address printed by `pnpm dev`, usually `http://localhost:3000`. Leave that terminal running while you browse the site; press Ctrl+C to stop it. There is no ZIP to extract: this folder is already the Git repository and contains the source files.

If `pnpm --version` reports a Corepack signature error on this Windows machine, an old Corepack shim is taking priority over the installed pnpm. In that PowerShell session, use the installed command directly:

```powershell
Set-Alias pnpm "$env:APPDATA\npm\pnpm.cmd"
pnpm --version
```

Then run the install and dev commands above. The alias lasts only for that PowerShell session.

Before publishing, run the same checks used in the deployment workflow:

```powershell
pnpm typecheck
$env:GITHUB_PAGES = "true"
$env:NEXT_PUBLIC_BASE_PATH = "/prep-kitchen"
pnpm build
Remove-Item Env:GITHUB_PAGES
Remove-Item Env:NEXT_PUBLIC_BASE_PATH
```

The static site will be in `out/`. Keep `out/` out of Git; GitHub Actions builds it again from the source. The base path is required because a project Pages site lives under `/prep-kitchen/`. The workflow obtains the correct base path from GitHub, including when a custom domain changes it.

## Publish with GitHub Pages

This checkout already has an `origin` remote at `https://github.com/shubhams-git/prep-kitchen.git` and uses the `master` branch. Do not create a second repository or upload a ZIP.

1. Finish local review. Visit the homepage and the recipe page, change the serving count, tick an ingredient, refresh to check saved progress, and open the cooking and storage views. Run `pnpm typecheck` and the static build above.
2. Inspect your changes with `git status` and `git diff`. `node_modules/`, `.next/` and `out/` are generated files and are ignored. Stage and review the files from this setup, then commit them:

   ```powershell
   git add .github/workflows/deploy-pages.yml .gitignore README.md package.json pnpm-workspace.yaml AGENTS.md CLAUDE.md
   git diff --cached
   git commit -m "Fix GitHub Pages deployment"
   ```

   Staging selects what the commit will contain; reviewing the staged diff catches accidental files before the snapshot is saved.
3. In the repository on GitHub, open **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**. On GitHub Free, make the repository public for Pages hosting. Configure this before pushing so the first workflow can deploy.
4. Push the commit with `git push origin master`. A push uploads your source code to GitHub. It does not upload `out/`.
5. Open **Actions → Publish Prep Kitchen to GitHub Pages**. Watch the build and deploy jobs. If this was the first setup and no push started a run, choose **Run workflow** on `master`.
6. In **Settings → Pages**, choose **Visit site** after deployment succeeds. With this repository name and no custom domain, the expected address is `https://shubhams-git.github.io/prep-kitchen/`. Check the homepage, recipe route, image, favicon and browser interaction at that public address.

Later, the usual cycle is **edit → run locally → typecheck and build → review diff → commit → push → check Actions → verify the live site**. If a workflow fails, open its failed step in Actions and fix that error locally before pushing another commit.

GitHub Pages is appropriate here because the app exports static pages and keeps interactive state in the visitor's browser. If you later add server-side accounts, a database or API routes, those features will need a server-capable host such as Vercel and a separate data service.

## Notes

- Cooking checks and timers are stored only on the same browser and device. Timer end times survive refreshes, but alerts need the page open; they are not phone notifications.
- Screen-awake support depends on the browser.
- Nutrition figures are estimates. The food image is an original AI-generated serving illustration.

Official references: [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [GitHub Pages publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), and [Next.js static export](https://nextjs.org/docs/app/guides/static-exports).
