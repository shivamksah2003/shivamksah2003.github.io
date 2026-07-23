import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Tag, Terminal, FileText } from 'lucide-react';
import blogData from '@/data/blog.json';

interface Post { slug: string; title: string; date: string; readTime: string; tags: string[]; excerpt: string; content: string; }
const posts = blogData as Post[];

interface PageProps { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 grid-bg">
      <div className="mx-auto max-w-3xl space-y-8">

        {/* Back Link */}
        <Link href="/blog" className="inline-flex items-center gap-2 font-mono text-xs text-neon-cyan hover:underline">
          <ArrowLeft size={14} /> // RETURN_TO_LOGS
        </Link>

        {/* Article HUD Container */}
        <article className="hud-card p-6 sm:p-8 space-y-6">
          
          {/* Header */}
          <header className="space-y-3 border-b pb-6" style={{ borderColor: 'var(--border)' }}>
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs" style={{ color: 'var(--text-3)' }}>
              <span>LOG_DATE: {post.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock size={12} className="text-neon-cyan"/> {post.readTime}</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-wide text-neon-cyan">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
              {post.tags.map(t => (
                <span key={t} className="px-2 py-0.5 rounded border" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--neon-green)' }}>
                  #{t}
                </span>
              ))}
            </div>
          </header>

          {/* Excerpt Box */}
          <div className="p-4 rounded border font-mono text-xs italic"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-2)' }}>
            <span className="text-neon-cyan font-bold font-sans not-italic">// EXECUTIVE SUMMARY: </span>
            {post.excerpt}
          </div>

          {/* Body Content */}
          <div className="font-sans text-sm sm:text-base leading-relaxed space-y-4" style={{ color: 'var(--text-1)' }}>
            <p>{post.content}</p>
          </div>

          {/* Terminal Signature */}
          <div className="pt-6 border-t font-mono text-xs flex justify-between items-center"
            style={{ borderColor: 'var(--border)', color: 'var(--text-3)' }}>
            <span>AUTHOR: Shivam Kumar Sah</span>
            <span className="text-neon-green">VERIFIED_LOG</span>
          </div>

        </article>

        {/* Other Logs */}
        {others.length > 0 && (
          <div className="space-y-4">
            <h2 className="section-label">// RELATED_DISPATCHES</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {others.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="hud-card p-4 block space-y-1">
                  <span className="font-mono text-[10px] text-neon-cyan">{p.readTime}</span>
                  <h3 className="font-display text-xs font-bold uppercase tracking-wider text-slate-100">{p.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
