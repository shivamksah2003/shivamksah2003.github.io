'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import CommandPalette from './CommandPalette';

const navLinks = [
  { href: '/',           label: 'Home'       },
  { href: '/about',      label: 'About'      },
  { href: '/skills',     label: 'Skills'     },
  { href: '/experience', label: 'Experience' },
  { href: '/blog',       label: 'Blog'       },
  { href: '/contact',    label: 'Contact'    },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: 'color-mix(in srgb, var(--bg) 80%, transparent)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        boxShadow: '0 0 30px var(--glow)',
      }}>

      {/* Top accent line */}
      <div className="h-[2px] w-full" style={{
        background: 'linear-gradient(90deg, transparent, var(--neon), var(--neon-alt), var(--neon), transparent)',
        opacity: 0.7,
      }} />

      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" onClick={() => setOpen(false)}
          className="flex items-center gap-2 group font-display">
          <div className="relative h-8 w-8 flex items-center justify-center">
            {/* Rotating border ring */}
            <div className="absolute inset-0 rounded-lg border-2 opacity-60 animate-rotate-slow"
              style={{ borderColor: 'var(--neon)', borderTopColor: 'transparent' }} />
            <span className="relative text-xs font-black font-display" style={{ color: 'var(--neon)' }}>SK</span>
          </div>
          <span className="text-sm font-bold tracking-widest uppercase" style={{ color: 'var(--text-1)' }}>
            SHIVAM<span style={{ color: 'var(--neon)' }}>_DEV</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link href={href}
                  className="relative px-4 py-2 text-xs font-display font-medium tracking-widest uppercase transition-all duration-200 rounded"
                  style={{
                    color:      active ? 'var(--neon)' : 'var(--text-2)',
                    background: active ? 'color-mix(in srgb, var(--neon) 8%, transparent)' : 'transparent',
                    textShadow: active ? '0 0 8px color-mix(in srgb, var(--neon) 60%, transparent)' : 'none',
                    borderBottom: active ? '1px solid var(--neon)' : '1px solid transparent',
                  }}>
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right controls */}
        <div className="hidden md:flex items-center gap-3">
          <CommandPalette />
          <ThemeToggle />
          <a href="/resume.pdf" download="Shivam_Kumar_Sah_Resume.pdf" target="_blank" rel="noopener noreferrer">
            <span className="btn-neon"><span>Resume</span></span>
          </a>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu"
            className="rounded p-2 transition-colors"
            style={{ color: 'var(--text-2)', border: '1px solid var(--border)' }}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-96' : 'max-h-0'}`}
        style={{ borderTop: '1px solid var(--border)' }}>
        <ul className="flex flex-col p-4 gap-1">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link href={href} onClick={() => setOpen(false)}
                  className="block rounded px-4 py-2.5 text-xs font-display font-medium tracking-widest uppercase transition-all"
                  style={{
                    color:      active ? 'var(--neon)' : 'var(--text-2)',
                    background: active ? 'color-mix(in srgb, var(--neon) 8%, transparent)' : 'transparent',
                  }}>
                  {label}
                </Link>
              </li>
            );
          })}
          <li className="pt-2">
            <a href="/resume.pdf" download="Shivam_Kumar_Sah_Resume.pdf" target="_blank" rel="noopener noreferrer"
              className="block text-center btn-neon"><span>Resume</span></a>
          </li>
        </ul>
      </div>
    </header>
  );
}
