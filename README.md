# Sandra Kawombe — Portfolio

A production-quality personal portfolio for a senior full-stack engineer.
Soft, feminine, premium — built with Next.js 14 (App Router), Tailwind CSS,
Framer Motion, and a small FastAPI backend.

> **🪞 Want to see the design first?** Open `preview.html` in any browser —
> it's a self-contained mock of the full aesthetic with no install required.

---

## Stack

| Layer         | Tech                                                                 |
| ------------- | -------------------------------------------------------------------- |
| Frontend      | Next.js 14 · React 18 · TypeScript · Tailwind CSS · Framer Motion    |
| Backend       | FastAPI · Pydantic v2 · httpx (async)                                |
| Fonts         | Fraunces (serif display) · Plus Jakarta Sans (body) · JetBrains Mono |
| Icons         | lucide-react                                                         |
| Deploy        | Vercel (frontend) · Fly.io / Render / Railway (backend)              |

---

## Project structure

```
portfolio/
├── preview.html               ← standalone aesthetic preview (no build needed)
│
├── frontend/                  ← Next.js 14 app
│   ├── app/
│   │   ├── layout.tsx         ← fonts, metadata, root layout
│   │   ├── page.tsx           ← home — composes all sections
│   │   ├── globals.css        ← tailwind + custom utilities
│   │   └── projects/[slug]/
│   │       └── page.tsx       ← dynamic case-study pages
│   ├── components/
│   │   ├── Navbar.tsx         ← sticky glass nav
│   │   ├── Hero.tsx           ← layered cards + parallax
│   │   ├── About.tsx          ← bio + skill cards
│   │   ├── Projects.tsx       ← projects grid wrapper
│   │   ├── ProjectCard.tsx    ← reusable project card
│   │   ├── Contact.tsx        ← form wired to FastAPI
│   │   ├── Footer.tsx
│   │   ├── ui/
│   │   │   └── BlobBackground.tsx
│   │   └── mocks/             ← visual mock UIs for each project
│   │       ├── WeatherMock.tsx
│   │       ├── TravelMock.tsx
│   │       └── ToTextMock.tsx
│   ├── lib/projects.ts        ← single source of truth for project data
│   ├── tailwind.config.ts     ← custom palette + animations
│   ├── package.json
│   └── .env.example
│
├── backend/                   ← FastAPI service
│   ├── main.py                ← /api/contact · /api/weather · /api/transcribe
│   ├── requirements.txt
│   └── .env.example
│
└── README.md
```

---

## 1. Quick aesthetic preview

If you just want to see how it looks:

```bash
open preview.html        # macOS
xdg-open preview.html    # Linux
start preview.html       # Windows
```

That single file demonstrates the hero, about, projects, and contact
sections with all animations — no Node, no Python, no install.

### Or — run the whole stack in one command

```bash
cp backend/.env.example backend/.env       # fill in if you want
docker compose up --build
```

Frontend at <http://localhost:3000>, API at <http://localhost:8000>.

---

## 2. Run the frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Open <http://localhost:3000>.

---

## 3. Run the backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate            # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env                 # then fill in optional values
uvicorn main:app --reload --port 8000
```

API docs auto-generated at <http://localhost:8000/docs>.

The contact form will work immediately — without SMTP credentials it logs
messages to the server console; with SMTP credentials it actually sends them.

---

## 4. Design system

| Token              | Value                                          |
| ------------------ | ---------------------------------------------- |
| Cream (background) | `#FBF6EF`                                      |
| Lavender ramp      | `#E8DBFA → #7B5FCF`                            |
| Blush ramp         | `#FCE6EE → #C9577A`                            |
| Nude               | `#F5E6D8 → #D6BC9A`                            |
| Plum (text/ink)    | `#2A1B3D` / `#1B0F2B`                          |
| Magenta (accent)   | `#E8508D`                                      |
| Mint (pop)         | `#C4E8D0`                                      |
| Display font       | Fraunces (variable serif, italic for emphasis) |
| Body font          | Plus Jakarta Sans                              |
| Mono font          | JetBrains Mono                                 |
| Card radius        | `36px` (hero/projects), `28px` (form)          |
| Shadow             | Soft lavender-tinted: `shadow-soft`            |
| Glass              | `backdrop-blur-xl bg-white/55 border-white/70` |

---

## 5. Customize

- **Personal info** — edit the strings in `components/Hero.tsx`,
  `components/About.tsx`, `components/Contact.tsx`.
- **Projects** — edit `lib/projects.ts`. Both the home grid and the
  `/projects/[slug]` pages read from the same file.
- **Palette** — change `tailwind.config.ts` colors and the
  `--gradient-*` variables in `app/globals.css`.
- **Mocks** — `components/mocks/*.tsx` are independent React components;
  swap them for real product screenshots once your apps are live.

---

## 6. Deploy

### Frontend (Vercel)

```bash
vercel --prod
```

Add `NEXT_PUBLIC_API_URL` in the Vercel dashboard pointing at your
backend URL.

### Backend (Fly.io example)

```bash
fly launch                # generates fly.toml + Dockerfile
fly secrets set OPENWEATHER_API_KEY=xxx SMTP_HOST=...
fly deploy
```

Then add the deployed origin to `ALLOWED_ORIGINS` in your backend env.

---

## 7. Optional enhancements

- **Dark mode** — Tailwind's `dark:` variants are wired through.
  Add a toggle that flips a class on `<html>`.
- **Blog** — add `/app/blog/` with MDX (`@next/mdx`) for writing.
- **CMS** — swap `lib/projects.ts` for a Sanity / Contentlayer source
  if you start shipping a lot of work.
- **Analytics** — add Vercel Analytics or Plausible in `layout.tsx`.
- **Email service** — swap SMTP for Resend or Postmark for better
  deliverability and a nicer dev experience.
- **Real Whisper transcription** — uncomment the `openai-whisper` line
  in `requirements.txt`, install `ffmpeg`, and the `/api/transcribe`
  endpoint becomes a working speech-to-text fallback for ToText.

---

Built with ♡.
