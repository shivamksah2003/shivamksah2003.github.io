/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan:   '#00f5ff',
          purple: '#a855f7',
          green:  '#00ff88',
          pink:   '#ff006e',
          blue:   '#0080ff',
          yellow: '#ffe600',
        },
        scifi: {
          bg:      '#020408',
          surface: '#050d18',
          card:    '#0a1628',
          border:  '#0d2137',
          muted:   '#1a3352',
        },
      },
      fontFamily: {
        sans:    ['var(--font-space)', 'system-ui', 'sans-serif'],
        display: ['var(--font-orbitron)', 'sans-serif'],
        mono:    ['var(--font-jetbrains)', 'Fira Code', 'monospace'],
      },
      animation: {
        'glitch':      'glitch 3s infinite',
        'scan':        'scan 8s linear infinite',
        'flicker':     'flicker 4s infinite',
        'pulse-neon':  'pulseNeon 2s ease-in-out infinite',
        'slide-up':    'slideUp 0.6s ease-out forwards',
        'fade-in':     'fadeIn 0.8s ease-out forwards',
        'border-glow': 'borderGlow 2s ease-in-out infinite alternate',
        'float':       'float 4s ease-in-out infinite',
        'blink':       'blink 1s step-end infinite',
        'pulse-slow':  'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'shimmer':     'shimmer 2.5s linear infinite',
        'rotate-slow': 'rotateSlow 12s linear infinite',
      },
      keyframes: {
        glitch: {
          '0%,100%': { transform: 'translate(0)',          textShadow: '0 0 8px #00f5ff' },
          '10%':     { transform: 'translate(-3px, 1px)',  textShadow: '-3px 0 #ff006e, 3px 0 #00f5ff' },
          '20%':     { transform: 'translate(3px, -1px)', textShadow:  '3px 0 #ff006e, -3px 0 #00f5ff' },
          '30%':     { transform: 'translate(0)',          textShadow: '0 0 8px #00f5ff' },
          '60%':     { transform: 'translate(-2px, 2px)', textShadow: '-2px 0 #a855f7, 2px 0 #00f5ff' },
          '70%':     { transform: 'translate(2px, -2px)', textShadow:  '2px 0 #a855f7, -2px 0 #00f5ff' },
          '80%':     { transform: 'translate(0)',          textShadow: '0 0 8px #00f5ff' },
        },
        scan: {
          '0%':   { transform: 'translateY(-10%)' },
          '100%': { transform: 'translateY(110%)' },
        },
        flicker: {
          '0%,19%,21%,23%,25%,54%,56%,100%': { opacity: '1' },
          '20%,24%,55%':                       { opacity: '0.5' },
        },
        pulseNeon: {
          '0%,100%': { boxShadow: '0 0 5px #00f5ff, 0 0 10px #00f5ff33, inset 0 0 5px #00f5ff11' },
          '50%':     { boxShadow: '0 0 20px #00f5ff, 0 0 40px #00f5ff55, inset 0 0 15px #00f5ff22' },
        },
        borderGlow: {
          from: { borderColor: 'rgba(0,245,255,0.2)', boxShadow: '0 0 5px rgba(0,245,255,0.1)' },
          to:   { borderColor: 'rgba(0,245,255,0.7)', boxShadow: '0 0 20px rgba(0,245,255,0.3), inset 0 0 10px rgba(0,245,255,0.05)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-10px)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        blink: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
        rotateSlow: {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
      },
      boxShadow: {
        'neon-cyan':   '0 0 5px #00f5ff, 0 0 20px rgba(0,245,255,0.4)',
        'neon-purple': '0 0 5px #a855f7, 0 0 20px rgba(168,85,247,0.4)',
        'neon-green':  '0 0 5px #00ff88, 0 0 20px rgba(0,255,136,0.4)',
        'neon-pink':   '0 0 5px #ff006e, 0 0 20px rgba(255,0,110,0.4)',
        'neon-strong': '0 0 10px #00f5ff, 0 0 40px rgba(0,245,255,0.5), 0 0 80px rgba(0,245,255,0.2)',
      },
    },
  },
  plugins: [],
};
