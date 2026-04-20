# Deploy guide — portfolio + projects

A step-by-step from "code on my laptop" to "live URLs to share on LinkedIn."

> **Hosts we'll use** (all free tier, no credit card required):
> - **GitHub** — code lives here.
> - **Vercel** — hosts the React/Next.js frontend. Auto-deploys on every git push.
> - **Render** — hosts the FastAPI Python backend. Auto-deploys on every git push.
>
> Why two hosts? Vercel doesn't run long-lived Python servers well. Render does, and it's free.

---

## Phase 1 — Get the portfolio on GitHub

### 1.1 One-time setup (skip if done)

```bash
# tell git who you are
git config --global user.name  "Sandra Kawombe"
git config --global user.email "kawombe60@gmail.com"
```

Make sure you can push to GitHub from the command line — the easiest way is the official CLI:

```bash
# install: https://cli.github.com/
gh auth login            # follow the prompts, pick HTTPS, authenticate via browser
```

### 1.2 Create the portfolio repo and push

From the `portfolio/` folder you have on disk:

```bash
cd portfolio

# initialize git
git init
git add .
git commit -m "Initial portfolio — Next.js + FastAPI"

# create the GitHub repo and push, all in one shot
gh repo create sandra-portfolio --public --source=. --remote=origin --push
```

> No `gh`? Do it manually: go to <https://github.com/new>, name it `sandra-portfolio`,
> make it Public, **don't** initialize with a README. Then back in your terminal:
> ```bash
> git remote add origin https://github.com/sandrakawombe/sandra-portfolio.git
> git branch -M main
> git push -u origin main
> ```

You should now see your code at `https://github.com/sandrakawombe/sandra-portfolio`.

---

## Phase 2 — Deploy the frontend to Vercel

### 2.1 Sign in

Go to <https://vercel.com/signup> → "Continue with GitHub." Authorize Vercel to access your repos.

### 2.2 Import the repo

1. Dashboard → **Add New… → Project**
2. Find `sandra-portfolio` → **Import**
3. **Root Directory** → click "Edit" → choose `frontend`
   *(critical — your Next.js app lives in the `frontend/` subfolder)*
4. Framework Preset → Next.js (auto-detected)
5. **Environment Variables** → add one for now:
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: `http://localhost:8000` *(we'll update this in Phase 3 once the backend is live)*
6. Click **Deploy**.

After ~90 seconds you'll get a URL like `https://sandra-portfolio.vercel.app`.
**The contact form won't work yet** — that's fine, we deploy the backend next.

### 2.3 Future deploys

Every `git push origin main` from now on will auto-redeploy. To preview a change before merging:

```bash
git checkout -b feature/new-bio
# … edit files …
git commit -am "Update bio"
git push -u origin feature/new-bio
```

Vercel will create a preview URL for the branch, posted as a comment on any PR.

---

## Phase 3 — Deploy the backend to Render

### 3.1 Sign in

Go to <https://render.com/> → "Sign up with GitHub."

### 3.2 Create the web service

1. Dashboard → **New + → Web Service**
2. Connect the `sandra-portfolio` repo
3. Fill in:
   | Field             | Value                                      |
   |-------------------|--------------------------------------------|
   | **Name**          | `sandra-portfolio-api`                     |
   | **Root Directory**| `backend`                                  |
   | **Runtime**       | Python 3                                   |
   | **Build Command** | `pip install -r requirements.txt`          |
   | **Start Command** | `uvicorn main:app --host 0.0.0.0 --port $PORT` |
   | **Plan**          | Free                                       |
4. **Environment Variables** (scroll down):
   - `OPENWEATHER_API_KEY` → get one free at <https://openweathermap.org/api>
   - `ALLOWED_ORIGINS` → `https://sandra-portfolio.vercel.app` *(your Vercel URL)*
   - SMTP vars are optional — leave blank and the contact form will log to Render's console instead.
5. Click **Create Web Service**.

After ~3 minutes you'll get a URL like `https://sandra-portfolio-api.onrender.com`.

> **Note about Render's free tier:** the service sleeps after 15 min of no traffic
> and takes ~30 sec to wake on the next request. Fine for a portfolio. If it
> annoys you, the $7/mo "Starter" plan keeps it always-on.

### 3.3 Connect the frontend to the backend

1. Back in **Vercel** → your project → **Settings → Environment Variables**
2. Edit `NEXT_PUBLIC_API_URL` → set to your Render URL
   *(e.g. `https://sandra-portfolio-api.onrender.com`)*
3. **Deployments** tab → ⋯ menu on the latest deployment → **Redeploy**

Now visit your portfolio's contact form and send yourself a test message. ✓

---

## Phase 4 — Custom domain (optional, free if you already own one)

1. Buy a domain at Namecheap / Porkbun / Cloudflare (~$10/year).
2. Vercel → project → **Settings → Domains** → add `sandrakawombe.dev`.
3. Follow the DNS instructions Vercel shows (usually one A record + one CNAME).
4. Update `metadata.openGraph.url` in `frontend/app/layout.tsx` to match.
5. Update `ALLOWED_ORIGINS` on Render to include the new domain too.

---

## Phase 5 — Repeat for each project

For ToText, Weather, and Travel:

1. Push the project repo to GitHub.
2. Deploy the frontend on Vercel (Root Directory = `frontend`).
3. Deploy the backend on Render (Root Directory = `backend`).
4. Update `frontend/lib/projects.ts` in your **portfolio** repo with the live URLs.
5. `git push` the portfolio → Vercel auto-redeploys with the new links.

See `GITHUB_STRATEGY.md` for the per-project repo template.

---

## Troubleshooting cheatsheet

| Symptom                                | Fix                                                                                  |
|----------------------------------------|--------------------------------------------------------------------------------------|
| Vercel build fails on `npm install`    | Make sure **Root Directory = `frontend`** in Vercel settings.                        |
| Contact form returns CORS error        | Add the exact Vercel URL (with `https://`, no trailing slash) to `ALLOWED_ORIGINS` on Render. Redeploy backend. |
| Render service shows "exited with code 1" | Check Logs tab — usually a missing env var or a typo in the start command.          |
| First request after idle is super slow | Render free tier cold-start. Normal. Upgrade to Starter ($7/mo) to keep it warm.     |
| `NEXT_PUBLIC_API_URL` change not picked up | Vercel needs a redeploy after env var changes. Settings → Deployments → Redeploy. |
| Site looks different in production     | Hard refresh (Cmd/Ctrl + Shift + R) to bust the browser cache.                       |

---

## Production-readiness checklist

Before sharing on LinkedIn:

- [ ] Frontend loads at your Vercel URL with no console errors
- [ ] Mobile view tested — open the URL on your phone, scroll the whole page
- [ ] Tablet view tested — Chrome DevTools → toggle device toolbar → iPad
- [ ] Contact form sends successfully
- [ ] Every "Live demo" + "GitHub" link on a project card actually works
- [ ] All three project case-study pages (`/projects/totext`, `/weather`, `/travel`) load
- [ ] Lighthouse score (DevTools → Lighthouse) is 90+ on Performance and Accessibility
- [ ] Open Graph preview looks right at <https://www.opengraph.xyz/>
- [ ] Favicon shows up in the browser tab *(add `frontend/app/icon.png` — Next.js picks it up automatically)*
