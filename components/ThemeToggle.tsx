'use client';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button onClick={toggle} id="theme-toggle-btn"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative flex h-8 w-8 items-center justify-center rounded transition-all duration-200"
      style={{ border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--neon)' }}>
      <span className="transition-transform duration-300 hover:scale-110">
        {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
      </span>
    </button>
  );
}
