'use client';

import Link from 'next/link';
import { ArrowRight, Github } from 'lucide-react';
import type { Project } from '@/types/project';

interface ProjectCardProps { project: Project }

const techColor = (t: string) => {
  const map: Record<string, string> = {
    Jenkins: '#e05a00', Docker: '#0db7ed', Git: '#f05032', Bash: '#00ff88',
    Ansible: '#e00', AWX: '#a855f7', Linux: '#ffe600', YAML: '#818cf8',
    Nginx: '#009639', MySQL: '#0074d9', Python: '#ffe600', OpenCV: '#00b4d8',
    YOLO: '#ff006e', NumPy: '#00f5ff', 'Docker Compose': '#0db7ed',
  };
  return map[t] ?? '#00f5ff';
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="hud-card group relative overflow-hidden flex flex-col p-6">
      {/* Holographic shimmer overlay */}
      <div className="pointer-events-none absolute inset-0 holographic opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Scan line sweep on hover */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px group-hover:animate-scan opacity-0 group-hover:opacity-100"
        style={{ background: 'linear-gradient(90deg, transparent, var(--neon), transparent)' }} />

      {/* Header row */}
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-xs font-bold px-2 py-1 rounded"
          style={{ background: 'color-mix(in srgb, var(--neon) 10%, transparent)', color: 'var(--neon)', border: '1px solid color-mix(in srgb, var(--neon) 30%, transparent)' }}>
          {String(project.id).padStart(2, '0')}
        </span>
        {/* Status */}
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest"
          style={{ color: 'var(--neon-green)' }}>
          <span className="h-1.5 w-1.5 rounded-full status-online animate-pulse-slow" />
          ONLINE
        </span>
      </div>

      {/* Title */}
      <h3 className="mb-2 font-display text-sm font-bold leading-snug tracking-wide uppercase transition-all duration-300"
        style={{ color: 'var(--text-1)' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--neon)'; (e.currentTarget as HTMLElement).style.textShadow = '0 0 8px var(--neon)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-1)'; (e.currentTarget as HTMLElement).style.textShadow = 'none'; }}>
        {project.title}
      </h3>

      {/* Description */}
      <p className="mb-5 flex-1 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
        {project.shortDesc}
      </p>

      {/* Tech badges */}
      <ul className="mb-5 flex flex-wrap gap-1.5">
        {project.tech.map(t => (
          <li key={t}
            className="rounded px-2 py-0.5 font-mono text-[10px] font-semibold"
            style={{
              color:      techColor(t),
              background: `${techColor(t)}18`,
              border:     `1px solid ${techColor(t)}44`,
            }}>
            {t}
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Link href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 rounded px-4 py-2 font-display text-[10px] font-bold tracking-widest uppercase transition-all hover:gap-2"
          style={{ background: 'var(--neon)', color: 'var(--bg)', boxShadow: '0 0 15px color-mix(in srgb, var(--neon) 40%, transparent)' }}>
          View Details <ArrowRight size={12} />
        </Link>
        <a href={project.github} target="_blank" rel="noopener noreferrer"
          aria-label={`GitHub - ${project.title}`}
          className="flex h-9 w-9 items-center justify-center rounded transition-all"
          style={{ border: '1px solid var(--border)', color: 'var(--text-2)' }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--neon)'; el.style.color = 'var(--neon)'; el.style.boxShadow = '0 0 10px color-mix(in srgb, var(--neon) 30%, transparent)'; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.color = 'var(--text-2)'; el.style.boxShadow = 'none'; }}>
          <Github size={15} />
        </a>
      </div>

      {/* Corner decorations */}
      <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ borderColor: 'var(--neon)' }} />
      <span className="pointer-events-none absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ borderColor: 'var(--neon-alt)' }} />
    </article>
  );
}
