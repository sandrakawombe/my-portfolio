export type Project = {
  slug: string;
  index: string;
  badge: string;
  title: string;
  blurb: string;
  long: string;
  stack: string[];
  liveUrl: string;
  repoUrl: string;
  theme: "p1" | "p2" | "p3";
};

export const PROJECTS: Project[] = [
  {
    slug: "totext",
    index: "01",
    badge: "Speech utility",
    title: "ToText — listen, then <em>read</em>.",
    blurb:
      "A buttery-smooth speech-to-text utility with live transcription, language switching, and a one-tap copy/share flow. Built for journaling, meetings, and ideas in motion.",
    long:
      "Uses the browser's native Web Speech API for fast on-device transcription, with an optional FastAPI backend that runs Whisper for higher-accuracy offline processing. Supports auto-punctuation, multi-language, export to .txt/.md/.docx, and a focus-mode minimal UI.",
    stack: ["React", "Web Speech API", "FastAPI", "Whisper (opt.)"],
    liveUrl: "https://totext-seven.vercel.app/",
    repoUrl: "https://github.com/sandrakawombe/totext",
    theme: "p1",
  },
  {
    slug: "weather",
    index: "02",
    badge: "Live API",
    title: "Weather, <em>softer</em>.",
    blurb:
      "A delightful weather app with real-time OpenWeather data, geolocation, and dynamic visuals that shift with the sky. Search any city; watch the gradient breathe.",
    long:
      "React + FastAPI. The FastAPI proxy keeps the OpenWeather API key off the client. Includes geolocation autodetect, recent-search history, and a gradient sky that interpolates between palettes based on the current condition and time of day.",
    stack: ["React", "FastAPI", "OpenWeather", "Framer Motion"],
    liveUrl: "https://weather-beta-ochre.vercel.app/",
    repoUrl: "https://github.com/sandrakawombe/weather",
    theme: "p2",
  },
  {
    slug: "travel",
    index: "03",
    badge: "Discovery UI",
    title: "Travel for the <em>curious</em>.",
    blurb:
      "A destination discovery experience with rich filters (location, budget, vibe), animated cards, and saved favorites. Plan your next escape in three taps.",
    long:
      "Full-stack: React frontend with infinite-scroll cards, FastAPI backend with PostgreSQL. Filters by region, budget bracket, season, and trip-style tags. Mapbox integration for visual discovery.",
    stack: ["React", "FastAPI", "PostgreSQL", "Mapbox"],
    liveUrl: "https://travel-sandra.vercel.app",
    repoUrl: "https://github.com/sandrakawombe/travel-app",
    theme: "p3",
  },
];
