"""
Sharon Nabiryo — Portfolio backend.

Endpoints
---------
GET  /                      health check
POST /api/contact           validate + send/log contact form
GET  /api/weather?city=...  proxy to OpenWeather (keeps API key server-side)
POST /api/transcribe        OPTIONAL — Whisper-powered audio → text fallback

Run locally:
    uvicorn main:app --reload --port 8000

Env (.env):
    SMTP_HOST=...        # optional — if unset, mails are logged only
    SMTP_PORT=...
    SMTP_USER=...
    SMTP_PASS=...
    MAIL_TO=hello@sharon.dev
    OPENWEATHER_API_KEY=...
    ALLOWED_ORIGINS=http://localhost:3000,https://sharon-nabiryo.vercel.app
"""
from __future__ import annotations

import os
import smtplib
import logging
from email.message import EmailMessage
from typing import Optional

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

load_dotenv()
log = logging.getLogger("portfolio")
logging.basicConfig(level=logging.INFO)

# ---------- app ----------
app = FastAPI(title="Sharon Nabiryo — Portfolio API", version="1.0.0")

origins = [o.strip() for o in os.getenv(
    "ALLOWED_ORIGINS", "http://localhost:3000"
).split(",")]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
    allow_credentials=False,
)


# ---------- models ----------
class ContactIn(BaseModel):
    name:    str      = Field(min_length=1, max_length=120)
    email:   EmailStr
    message: str      = Field(min_length=10, max_length=4000)


class ContactOut(BaseModel):
    ok: bool
    detail: str


# ---------- routes ----------
@app.get("/")
def health() -> dict:
    return {"ok": True, "service": "portfolio-api"}


@app.post("/api/contact", response_model=ContactOut)
def contact(payload: ContactIn) -> ContactOut:
    """Send the contact form via SMTP, or log it if SMTP is not configured."""
    subject = f"[Portfolio] New message from {payload.name}"
    body = (
        f"From: {payload.name} <{payload.email}>\n\n"
        f"{payload.message}\n"
    )

    smtp_host = os.getenv("SMTP_HOST")
    if not smtp_host:
        log.info("Contact (mock send) — %s <%s>: %s",
                 payload.name, payload.email, payload.message[:80])
        return ContactOut(ok=True, detail="Message received (mock — SMTP not configured).")

    try:
        msg = EmailMessage()
        msg["Subject"] = subject
        msg["From"]    = os.getenv("SMTP_USER", "noreply@sharon.dev")
        msg["To"]      = os.getenv("MAIL_TO", "hello@sharon.dev")
        msg["Reply-To"] = payload.email
        msg.set_content(body)

        port = int(os.getenv("SMTP_PORT", "587"))
        with smtplib.SMTP(smtp_host, port, timeout=15) as s:
            s.starttls()
            s.login(os.getenv("SMTP_USER", ""), os.getenv("SMTP_PASS", ""))
            s.send_message(msg)
    except Exception as exc:
        log.exception("SMTP send failed")
        raise HTTPException(status_code=502, detail=f"Mail send failed: {exc}") from exc

    return ContactOut(ok=True, detail="Message sent.")


@app.get("/api/weather")
async def weather(city: str, units: str = "metric") -> dict:
    """Proxy OpenWeather so the API key stays on the server."""
    key = os.getenv("OPENWEATHER_API_KEY")
    if not key:
        raise HTTPException(503, "Weather service not configured.")

    url = "https://api.openweathermap.org/data/2.5/weather"
    params = {"q": city, "units": units, "appid": key}

    async with httpx.AsyncClient(timeout=8.0) as client:
        r = await client.get(url, params=params)
    if r.status_code != 200:
        raise HTTPException(r.status_code, r.json().get("message", "Weather lookup failed."))

    d = r.json()
    return {
        "city":      d.get("name"),
        "country":   d.get("sys", {}).get("country"),
        "temp":      round(d["main"]["temp"]),
        "feels":     round(d["main"]["feels_like"]),
        "humidity":  d["main"]["humidity"],
        "wind_kmh":  round(d["wind"]["speed"] * 3.6, 1),
        "condition": d["weather"][0]["main"],
        "icon":      d["weather"][0]["icon"],
    }


@app.post("/api/transcribe")
async def transcribe(audio: UploadFile = File(...)) -> dict:
    """
    Optional ToText fallback when the browser's Web Speech API isn't available.
    Requires `openai-whisper` and ffmpeg.  If not installed, returns a clear error.
    """
    try:
        import whisper  # type: ignore
    except ImportError as exc:
        raise HTTPException(
            501,
            "Whisper not installed — run `pip install openai-whisper` and ensure ffmpeg is on PATH."
        ) from exc

    suffix = os.path.splitext(audio.filename or "audio.wav")[1] or ".wav"
    tmp_path = f"/tmp/upload{suffix}"
    with open(tmp_path, "wb") as f:
        f.write(await audio.read())

    model = whisper.load_model("base")
    result = model.transcribe(tmp_path)
    return {"text": result.get("text", "").strip(), "language": result.get("language")}
