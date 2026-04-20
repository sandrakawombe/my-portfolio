# GitHub strategy — organizing your portfolio

## The 4-repo plan

```
github.com/sandrakawombe/
├── sandrakawombe        ← profile README (the "card" at the top of your GitHub)
├── sandra-portfolio     ← this site
├── totext               ← project 1
├── weather-app          ← project 2
└── travel-app           ← project 3
```

**Why separate repos for each project?**
Recruiters click into individual project repos to read the README, scan the
file structure, and judge code quality. A monorepo with all three buried
inside makes that harder. Separate repos = each project gets a dedicated
README, its own commit history, its own deploy pipeline, and its own URL
to share on LinkedIn.

---

## Each project repo follows the same template

```
project-name/
├── frontend/                ← React (Vite) or Next.js
│   ├── src/
│   ├── package.json
│   └── Dockerfile
├── backend/                 ← FastAPI
│   ├── main.py
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml       ← optional, for local dev
├── .github/workflows/
│   └── ci.yml               ← lint + test on every push
├── README.md                ← screenshot + live link + how to run
└── LICENSE                  ← MIT, usually
```

You already have this template — your `sandra-portfolio` repo *is* the
template. Just copy the structure to each new project.

---

## What every project README should have

Recruiters scan READMEs in <30 seconds. Front-load the good stuff:

```markdown
# ToText — speech to text, beautifully

> Live demo: https://totext-sandra.vercel.app
> Tech: React · FastAPI · Web Speech API · Whisper

![ToText screenshot](docs/screenshot.png)

A speech-to-text utility with live transcription, language switching,
and one-tap export. Built to feel buttery on mobile.

## Features
- Real-time browser transcription via Web Speech API
- Optional Whisper backend for offline accuracy
- Auto-punctuation, multi-language
- Export to .txt / .md / .docx
- Mobile-first, glassmorphic UI

## Tech stack
| Layer    | Tech                              |
|----------|-----------------------------------|
| Frontend | React 18, TypeScript, Tailwind    |
| Backend  | FastAPI, Pydantic, Whisper        |
| Hosting  | Vercel (FE) · Render (BE)         |

## Run locally
\`\`\`bash
# frontend
cd frontend && npm install && npm run dev

# backend (in a new terminal)
cd backend && pip install -r requirements.txt && uvicorn main:app --reload
\`\`\`

## Architecture
Brief paragraph + a simple diagram if the system has interesting parts.

## What I learned
2-3 bullets — recruiters love this. "Why I chose Whisper over Deepgram,"
"How I handled iOS Safari's spotty Web Speech support," etc.
```

> The screenshot in the README matters more than you think. Take one
> on a real device or in a clean browser window — no extension toolbars,
> no localhost URL bar. Save it as `docs/screenshot.png` in the repo.

---

## The profile README repo (the GitHub "card")

Create a repo named **exactly** `sandrakawombe` (same as your username).
GitHub will pin its README to the top of your profile page.

```
github.com/sandrakawombe/sandrakawombe/
└── README.md
```

A clean version to start with:

```markdown
### Hi, I'm Sandra 👋

Full-stack engineer building elegant React + Python products.
Currently open to work.

- 🌍 Portfolio → [sandra-portfolio.vercel.app](https://sandra-portfolio.vercel.app)
- 💼 LinkedIn → [sandra-nakayima](https://www.linkedin.com/in/sandra-nakayima/)
- 📧 Email → kawombe60@gmail.com

#### Recent projects
- 🎙️ **[ToText](https://github.com/sandrakawombe/totext)** — speech-to-text utility (React + FastAPI)
- 🌦️ **[Weather](https://github.com/sandrakawombe/weather-app)** — beautiful real-time weather (React + FastAPI)
- ✈️ **[Travel](https://github.com/sandrakawombe/travel-app)** — destination discovery UI (React + FastAPI)

#### Stack
React · TypeScript · Next.js · Python · FastAPI · PostgreSQL · Docker · AWS
```

---

## Pin your top 3-6 repos

GitHub profile → "Customize your pins" → pick:

1. `sandra-portfolio`
2. `totext`
3. `weather-app`
4. `travel-app`

These show up in a 2-row grid on your profile, above the contribution graph.
This is the first thing recruiters see.

---

## Recommended commit hygiene

You don't need to be precious about commit messages, but a few habits help:

- **One thing per commit.** `feat: add transcription export` is better than `wip stuff`.
- **Conventional commits** (optional but pretty): prefixes like `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`. Makes the GitHub commit history scannable.
- **Don't squash everything.** A history of 30 small commits looks more impressive than 1 huge "initial commit" — it shows iteration and thought.
- **Push often.** GitHub's contribution graph (the green squares) is dumb but real — visitors do glance at it.

---

## A simple GitHub Actions CI workflow

Drop this into `.github/workflows/ci.yml` in each project repo. It runs on every push, catches broken code before deploy.

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:

jobs:
  frontend:
    runs-on: ubuntu-latest
    defaults: { run: { working-directory: frontend } }
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm, cache-dependency-path: frontend/package-lock.json }
      - run: npm ci
      - run: npm run lint
      - run: npm run build

  backend:
    runs-on: ubuntu-latest
    defaults: { run: { working-directory: backend } }
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: "3.12", cache: pip, cache-dependency-path: backend/requirements.txt }
      - run: pip install -r requirements.txt
      - run: python -m py_compile main.py
```

Green check on every commit = signal that you take quality seriously.

---

## Order to ship

You said ToText first, Weather second, Travel third. Here's a sane week-by-week plan:

| Week | Goal                                                                                  |
|------|---------------------------------------------------------------------------------------|
| 1    | Polish & deploy this **portfolio** site so the contact form works.                    |
| 2    | Build & deploy **ToText** (smallest scope — single page, mostly browser API).         |
| 3    | Build & deploy **Weather** (more API integration, more visual polish).                |
| 4    | Build & deploy **Travel** (biggest — DB + filters + map). Ship a v1, iterate later.   |

Update `frontend/lib/projects.ts` in your portfolio after each launch. Push. Done.

---

## The LinkedIn post template

Once a project is live, post something like this — it does well:

```
🎙️ Just shipped ToText — a speech-to-text utility I built with React + FastAPI.

Live: https://totext-sandra.vercel.app
Code: https://github.com/sandrakawombe/totext

Why I built it:
[1-2 sentences — what problem, why it mattered to you]

What I learned:
• [technical thing 1]
• [technical thing 2]
• [a UI/UX insight]

Next up: a weather app with dynamic visuals based on the sky 🌦️

Open to full-stack engineering roles — let's chat 💌

#React #Python #FastAPI #FullStack #OpenToWork
```

Post on **Tuesday or Wednesday morning** (best engagement). Pin it to your profile.
