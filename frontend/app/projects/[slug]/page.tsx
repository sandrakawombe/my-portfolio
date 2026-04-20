import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { PROJECTS } from "@/lib/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlobBackground from "@/components/ui/BlobBackground";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = PROJECTS.find((x) => x.slug === params.slug);
  if (!p) return {};
  return {
    title: `${p.title.replace(/<[^>]+>/g, "")} — Sharon Nabiryo`,
    description: p.blurb,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const p = PROJECTS.find((x) => x.slug === params.slug);
  if (!p) notFound();

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <BlobBackground />
      <Navbar />

      <article className="relative z-10 max-w-3xl mx-auto px-8 py-20">
        <Link
          href="/#work"
          className="inline-flex items-center gap-1.5 text-sm text-plum-soft
                     hover:text-magenta transition-colors mb-12"
        >
          <ArrowLeft size={14} /> All projects
        </Link>

        <div className="section-label">{p.index} · {p.badge}</div>
        <h1
          className="display-h1 text-plum mt-6
                     text-[clamp(40px,6vw,72px)]"
          dangerouslySetInnerHTML={{ __html: p.title }}
        />

        <p className="mt-6 text-xl text-plum-soft leading-relaxed">{p.blurb}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span
              key={s}
              className="font-mono text-xs px-3 py-1 rounded-full
                         bg-lavender-100 border border-lavender-600/15
                         text-plum-soft"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={p.liveUrl} target="_blank"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full
                           bg-plum-ink text-cream text-sm font-medium
                           hover:-translate-y-0.5 transition-transform">
            Live demo <ArrowUpRight size={16} />
          </Link>
          <Link href={p.repoUrl} target="_blank"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full
                           border border-plum/25 text-plum text-sm font-medium
                           hover:bg-plum/5 transition-colors">
            <Github size={16} /> GitHub
          </Link>
        </div>

        <div className="mt-14 prose prose-lg prose-p:text-plum-soft
                        prose-headings:font-display prose-headings:text-plum
                        max-w-none">
          <h2 className="display-h2 text-3xl">Overview</h2>
          <p className="text-plum-soft leading-relaxed">{p.long}</p>
        </div>
      </article>

      <Footer />
    </main>
  );
}
