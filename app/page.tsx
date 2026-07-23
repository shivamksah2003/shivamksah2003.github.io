'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Mail, ChevronDown, ExternalLink, Terminal, GitBranch, Server, Container, Shield, Cpu, Activity, Zap } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
import PipelineSimulator from '@/components/PipelineSimulator';
import ArchitectureInspector from '@/components/ArchitectureInspector';
import projectsData from '@/data/projects.json';
import type { Project } from '@/types/project';

const projects = projectsData as Project[];

const socialLinks = [
  { href: 'https://github.com/shivamksah2003',                       label: 'GitHub',   icon: <Github   size={18} /> },
  { href: 'https://www.linkedin.com/in/shivam-kumar-sah-9b91a1387',  label: 'LinkedIn', icon: <Linkedin size={18} /> },
  { href: 'mailto:shivamk.sah2003@gmail.com',                        label: 'Gmail',    icon: <Mail     size={18} /> },
];

const stats = [
  { value: '04',   label: 'ACTIVE DEPLOYMENTS', sub: 'Production Ready' },
  { value: '8.54', label: 'ACADEMIC METRIC',    sub: 'B.Tech CGPA Score' },
  { value: '99.9%',label: 'PIPELINE UPTIME',    sub: 'Zero Breakdown' },
  { value: '100%', label: 'AUTOMATED TOIL',     sub: 'Infrastructure as Code' },
];

const pipeline = [
  { stage: 'CODE_COMMIT', icon: <GitBranch size={14} />, status: 'active',   detail: 'Git / GitHub' },
  { stage: 'CONTAINER',   icon: <Container size={14} />, status: 'active',   detail: 'Docker Engine' },
  { stage: 'AUDIT_TEST',  icon: <Shield    size={14} />, status: 'active',   detail: 'SecOps Audit' },
  { stage: 'PROD_DEPLOY', icon: <Server    size={14} />, status: 'syncing',  detail: 'Ansible / AWX' },
];

const roles = [
  'DEVOPS_ENGINEER',
  'INFRASTRUCTURE_ARCHITECT',
  'AUTOMATION_OPERATIVE',
  'CI/CD_PIPELINE_ENGINEER',
];

function SciFiTypingHero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = roles[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  return (
    <span className="font-mono tracking-widest text-neon-cyan">
      {displayed}
      <span className="animate-blink font-bold text-neon-cyan">_</span>
    </span>
  );
}

export default function HomePage() {
  return (
    <main className="relative min-h-screen grid-bg overflow-hidden">
      
      {/* ─── Hero Section ────────────────────────────────────────── */}
      <section className="relative flex min-h-[92vh] flex-col items-center justify-center px-4 pt-12 text-center">
        
        {/* Sci-fi background glow circles */}
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.15) 0%, rgba(168,85,247,0.08) 50%, transparent 70%)' }} />

        {/* HUD Top Badge */}
        <div className="hud-card mb-6 inline-flex items-center gap-3 px-4 py-2 text-xs font-mono">
          <span className="flex h-2 w-2 rounded-full bg-neon-green status-online" />
          <span style={{ color: 'var(--text-3)' }}>SYS_STATUS:</span>
          <span className="font-bold tracking-wider text-neon-cyan">OPERATIONAL // DEVOPS MATRIX</span>
        </div>

        {/* Title */}
        <h1 className="font-display max-w-4xl text-4xl font-black tracking-wider uppercase sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ color: 'var(--text-1)' }}>
          SHIVAM KUMAR{' '}
          <span className="relative inline-block animate-glitch" style={{ color: 'var(--neon)', textShadow: '0 0 20px var(--neon)' }}>
            SAH
          </span>
        </h1>

        {/* Typing role */}
        <div className="mt-4 flex items-center justify-center gap-2 font-mono text-sm sm:text-base md:text-lg">
          <span style={{ color: 'var(--text-3)' }}>[ROLE]</span>
          <SciFiTypingHero />
        </div>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl text-xs sm:text-sm leading-relaxed tracking-wide font-sans"
          style={{ color: 'var(--text-2)' }}>
          Architecting automated infrastructure systems. Containerising workloads, orchestrating CI/CD zero-downtime pipelines, and eliminating manual toil through code.
        </p>

        {/* Pipeline Simulator HUD */}
        <div className="mt-10 max-w-4xl w-full">
          <PipelineSimulator />
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="#projects" className="btn-neon-solid">
            <span>EXPLORE_DEPLOYMENTS</span>
          </Link>
          <Link href="/contact" className="btn-neon">
            <span>INITIATE_CONTACT</span>
          </Link>
        </div>

        {/* Social Links */}
        <div className="mt-8 flex items-center gap-3">
          {socialLinks.map(({ href, label, icon }) => (
            <a key={label} href={href} target={href.startsWith('mailto') ? '_self' : '_blank'} rel="noopener noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded border transition-all hover:scale-110"
              style={{ border: '1px solid var(--border)', color: 'var(--text-2)', background: 'var(--bg-card)' }}>
              {icon}
            </a>
          ))}
        </div>

        {/* Scroll cue */}
        <a href="#stats" aria-label="Scroll to stats" className="mt-12 animate-bounce" style={{ color: 'var(--neon)' }}>
          <ChevronDown size={22} />
        </a>
      </section>

      {/* ─── Stats Matrix ────────────────────────────────────────── */}
      <section id="stats" className="hud-divider py-12" style={{ background: 'var(--bg-surface)' }}>
        <div className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {stats.map(({ value, label, sub }) => (
            <div key={label} className="hud-card p-6 text-center flex flex-col items-center justify-center">
              <span className="font-display text-3xl font-black sm:text-4xl text-neon-cyan" style={{ textShadow: '0 0 12px var(--neon)' }}>
                {value}
              </span>
              <span className="mt-2 font-display text-[11px] font-bold tracking-widest uppercase" style={{ color: 'var(--text-1)' }}>
                {label}
              </span>
              <span className="mt-1 font-mono text-[10px]" style={{ color: 'var(--text-3)' }}>
                {sub}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Sci-Fi Terminal Section ──────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="terminal-window shadow-2xl">
            <div className="terminal-titlebar">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
              <span className="ml-3 font-mono text-xs text-neon-cyan">shivam@matrix-core:~# query_system_specs</span>
            </div>
            <div className="p-6 font-mono text-xs sm:text-sm leading-relaxed space-y-3" style={{ background: 'var(--bg-card)' }}>
              <p><span className="text-neon-green">root@shivam:~#</span> <span style={{ color: 'var(--text-1)' }}>fetch --system-manifest</span></p>
              
              <div className="p-4 rounded border font-mono text-xs space-y-1.5"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
                <p><span className="text-neon-pink">[IDENTITY]</span> Shivam Kumar Sah | DevOps Engineer</p>
                <p><span className="text-neon-cyan">[ORGANISATION]</span> EyesOnCloud Engineering</p>
                <p><span className="text-neon-purple">[ACADEMICS]</span> B.Tech CSE (CGPA: 8.54 / 10.0)</p>
                <p><span className="text-neon-green">[PRIMARY_STACK]</span> Docker, Jenkins, Ansible, Python, Linux, AWS</p>
                <p><span className="text-yellow-400">[AUTOMATION_RATING]</span> 99.8% Manual Toil Elimination</p>
              </div>

              <p className="pt-2">
                <span className="text-neon-green">root@shivam:~#</span> <span className="animate-blink text-neon-cyan">_</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Projects Grid ────────────────────────────────────────── */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <span className="section-label mb-2 block">
              // DEPLOYMENT_CATALOGUE
            </span>
            <h2 className="font-display text-3xl font-black tracking-wider uppercase sm:text-4xl" style={{ color: 'var(--text-1)' }}>
              CORE <span className="neon-text">PROJECTS</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm font-sans" style={{ color: 'var(--text-2)' }}>
              Production pipelines, container architectures, and automated cloud deployments.
            </p>
          </div>

          <div className="mb-10">
            <ArchitectureInspector />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <a href="https://github.com/shivamksah2003" target="_blank" rel="noopener noreferrer"
              className="btn-neon inline-flex items-center gap-2">
              <Github size={14} />
              <span>ACCESS_FULL_REPOSITORIES</span>
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
