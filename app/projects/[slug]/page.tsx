import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Github, CheckCircle2, Layers, GitBranch, Terminal, ShieldCheck, Activity } from 'lucide-react';
import ArchitectureInspector from '@/components/ArchitectureInspector';
import projectsData from '@/data/projects.json';
import type { Project } from '@/types/project';

const projects = projectsData as Project[];

interface PageProps { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) return {};
  return { title: `${p.title} — Shivam Kumar Sah`, description: p.shortDesc };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 grid-bg">
      <div className="mx-auto max-w-4xl space-y-8">

        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 font-mono text-xs text-neon-cyan hover:underline">
          <ArrowLeft size={14} /> // RETURN_TO_MATRIX
        </Link>

        {/* Specification Card */}
        <div className="hud-card p-6 sm:p-8 space-y-8">

          {/* Header */}
          <div className="border-b pb-6 space-y-3" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-neon-cyan font-bold">[SPECIFICATION_ID: PROJECT_{String(project.id).padStart(2, '0')}]</span>
              <span className="text-neon-green flex items-center gap-1"><Activity size={12}/> SYSTEM_ACTIVE</span>
            </div>
            
            <h1 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-wide text-neon-cyan">
              {project.title}
            </h1>
            
            <p className="font-sans text-xs sm:text-sm" style={{ color: 'var(--text-2)' }}>
              {project.shortDesc}
            </p>
          </div>

          {/* Interactive Architecture Inspector */}
          <div className="pt-2">
            <ArchitectureInspector defaultSlug={project.slug} />
          </div>

          {/* Technical Specs & Full Description */}
          <div className="space-y-4">
            <span className="section-label flex items-center gap-2">
              <Terminal size={14} /> SYSTEM_ARCHITECTURE_OVERVIEW
            </span>
            <p className="font-sans text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-1)' }}>
              {project.fullDesc}
            </p>
          </div>

          {/* Tech Stack Grid */}
          <div className="space-y-4">
            <span className="section-label flex items-center gap-2">
              <Layers size={14} /> COMPONENT_STACK
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="font-mono text-xs px-3 py-1 rounded border font-bold"
                  style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--neon-green)' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-4">
            <span className="section-label flex items-center gap-2">
              <ShieldCheck size={14} /> VERIFIED_SYSTEM_CAPABILITIES
            </span>
            <div className="grid gap-3 sm:grid-cols-2">
              {project.highlights.map((h) => (
                <div key={h} className="p-3 rounded border font-mono text-xs flex items-start gap-2.5"
                  style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-2)' }}>
                  <CheckCircle2 size={14} className="text-neon-cyan shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 flex flex-wrap gap-4 border-t" style={{ borderColor: 'var(--border)' }}>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-neon-solid flex items-center gap-2">
              <Github size={14} />
              <span>INSPECT_GITHUB_REPOSITORY</span>
            </a>
            <Link href="/" className="btn-neon">
              <span>RETURN_HOME</span>
            </Link>
          </div>

        </div>

      </div>
    </main>
  );
}
