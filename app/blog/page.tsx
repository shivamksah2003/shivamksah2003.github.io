import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Tag, ArrowRight, Terminal, FileCode } from 'lucide-react';
import blogData from '@/data/blog.json';

export const metadata: Metadata = {
  title: 'Blog — Shivam Kumar Sah',
  description: 'DevOps technical logs, architectural notes, and TIL documentation.',
};

interface Post {
  slug: string; title: string; date: string;
  readTime: string; tags: string[]; excerpt: string; content: string;
}

const posts = blogData as Post[];

export default function BlogPage() {
  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 grid-bg">
      <div className="mx-auto max-w-4xl space-y-12">

        {/* Header */}
        <div className="text-center">
          <span className="section-label">// SYSTEM_DISPATCHES</span>
          <h1 className="font-display text-3xl font-black uppercase tracking-wider text-neon-cyan sm:text-4xl mt-1">
            DEV_LOGS &amp; <span className="neon-text-green">TIL NOTES</span>
          </h1>
          <p className="mt-3 text-xs sm:text-sm max-w-lg mx-auto font-sans" style={{ color: 'var(--text-2)' }}>
            Field notes on Docker networking, Ansible automation, Jenkins pipelines, and SecOps debugging.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="space-y-6">
          {posts.map((post, idx) => (
            <article key={post.slug} className="hud-card p-6 flex flex-col sm:flex-row gap-6 items-start">
              
              {/* Log Index */}
              <div className="font-mono text-3xl font-black text-neon-cyan shrink-0">
                LOG_{String(idx + 1).padStart(2, '0')}
              </div>

              <div className="flex-1 space-y-3">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs" style={{ color: 'var(--text-3)' }}>
                  <time dateTime={post.date}>{post.date}</time>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock size={11} className="text-neon-cyan"/> {post.readTime}</span>
                </div>

                {/* Title */}
                <h2 className="font-display text-lg font-bold tracking-wide uppercase transition-colors" style={{ color: 'var(--text-1)' }}>
                  <Link href={`/blog/${post.slug}`} className="hover:text-neon-cyan">
                    {post.title}
                  </Link>
                </h2>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm leading-relaxed font-sans" style={{ color: 'var(--text-2)' }}>
                  {post.excerpt}
                </p>

                {/* Tags & Action */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                    {post.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded border" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--neon-green)' }}>
                        #{t}
                      </span>
                    ))}
                  </div>

                  <Link href={`/blog/${post.slug}`} className="btn-neon text-[10px] py-1.5 px-3 flex items-center gap-1.5">
                    <span>READ_LOG</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>

              </div>

            </article>
          ))}
        </div>

      </div>
    </main>
  );
}
