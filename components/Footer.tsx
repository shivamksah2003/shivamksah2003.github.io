'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

const socials = [
  { href: 'https://github.com/shivamksah2003',                       label: 'GitHub',   icon: <Github   size={15}/> },
  { href: 'https://www.linkedin.com/in/shivam-kumar-sah-9b91a1387',  label: 'LinkedIn', icon: <Linkedin size={15}/> },
  { href: 'mailto:shivamk.sah2003@gmail.com',                        label: 'Gmail',    icon: <Mail     size={15}/> },
];
const links = [
  { href: '/', label: 'Home' }, { href: '/about', label: 'About' },
  { href: '/skills', label: 'Skills' }, { href: '/experience', label: 'Experience' },
  { href: '/blog', label: 'Blog' },    { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
      {/* Top neon line */}
      <div className="h-px w-full" style={{
        background: 'linear-gradient(90deg, transparent, var(--neon), transparent)',
        opacity: 0.4,
      }} />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-3">

          {/* Brand */}
          <div className="space-y-4">
            <p className="font-display text-sm font-bold tracking-widest uppercase" style={{ color: 'var(--neon)' }}>
              SHIVAM<span style={{ color: 'var(--text-2)' }}>_DEV</span>
            </p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>
              DevOps Engineer · Automation Enthusiast<br/>
              Building pipelines that never sleep.
            </p>
            <div className="font-mono text-xs" style={{ color: 'var(--text-3)' }}>
              <span style={{ color: 'var(--neon-green)' }}>$</span>{' '}
              <span>echo &quot;Always shipping&quot;</span>
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="mb-4 font-display text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--text-3)' }}>Navigation</p>
            <ul className="grid grid-cols-2 gap-2">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}
                    className="flex items-center gap-1 text-xs transition-all group font-display tracking-wider uppercase"
                    style={{ color: 'var(--text-3)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--neon)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-3)'; }}>
                    {label}
                    <ArrowUpRight size={9} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <p className="mb-4 font-display text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--text-3)' }}>Connect</p>
            <ul className="space-y-3">
              {socials.map(({ href, label, icon }) => (
                <li key={label}>
                  <a href={href}
                    target={href.startsWith('mailto') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-xs transition-all"
                    style={{ color: 'var(--text-3)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--neon)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-3)'; }}>
                    {icon} {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hud-divider my-8" />

        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="font-mono text-xs" style={{ color: 'var(--text-3)' }}>
            &copy; {year} Shivam Kumar Sah
          </p>
          <p className="font-mono text-xs" style={{ color: 'var(--text-3)', opacity: 0.5 }}>
            Next.js · TypeScript · Tailwind · Sci-Fi
          </p>
        </div>
      </div>
    </footer>
  );
}
