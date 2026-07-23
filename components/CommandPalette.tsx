'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Terminal, X, Search, Command, CornerDownLeft } from 'lucide-react';

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen]   = useState(false);
  const [input, setInput]     = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut listener for Ctrl+K, Cmd+K, or ~ key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === '`' || e.key === '~') {
        const activeTag = document.activeElement?.tagName.toLowerCase();
        if (activeTag !== 'input' && activeTag !== 'textarea') {
          e.preventDefault();
          setIsOpen((prev) => !prev);
        }
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    let output: React.ReactNode = null;

    switch (trimmed) {
      case 'help':
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="text-neon-cyan font-bold">AVAILABLE COMMANDS:</p>
            <p><span className="text-neon-green">projects</span> - List all 4 core DevOps projects</p>
            <p><span className="text-neon-green">skills</span> - View skill matrix &amp; proficiencies</p>
            <p><span className="text-neon-green">bio / whoami</span> - View Shivam&apos;s credentials &amp; CGPA</p>
            <p><span className="text-neon-green">contact</span> - Display direct contact email &amp; phone</p>
            <p><span className="text-neon-green">theme</span> - Toggle between Dark and Light mode</p>
            <p><span className="text-neon-green">clear</span> - Clear terminal logs</p>
            <p><span className="text-neon-green">exit / quit</span> - Close terminal console</p>
          </div>
        );
        break;

      case 'projects':
      case 'ls':
        output = (
          <div className="space-y-2">
            <p className="text-neon-cyan font-bold">CORE PROJECTS:</p>
            <div className="pl-2 space-y-1">
              <p>1. <button onClick={() => { router.push('/projects/ci-cd-pipeline'); setIsOpen(false); }} className="text-neon-green hover:underline">End-to-End CI/CD Pipeline</button> (Jenkins, Docker, Git, Bash)</p>
              <p>2. <button onClick={() => { router.push('/projects/ansible-awx'); setIsOpen(false); }} className="text-neon-green hover:underline">Ansible &amp; AWX Automation</button> (Ansible, AWX, Linux, YAML)</p>
              <p>3. <button onClick={() => { router.push('/projects/three-tier-docker'); setIsOpen(false); }} className="text-neon-green hover:underline">Three-Tier Docker Web App</button> (Docker, Nginx, MySQL, Compose)</p>
              <p>4. <button onClick={() => { router.push('/projects/ai-detection'); setIsOpen(false); }} className="text-neon-green hover:underline">AI Person Detection System</button> (Python, OpenCV, YOLO, NumPy)</p>
            </div>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="text-neon-cyan font-bold">DEV_STACK MATRIX:</p>
            <p><span className="text-neon-purple">CI/CD:</span> Jenkins, GitHub Actions, Bash, Git</p>
            <p><span className="text-neon-purple">Containers:</span> Docker, Docker Compose, Nginx</p>
            <p><span className="text-neon-purple">Automation:</span> Ansible, AWX, Linux OS, YAML</p>
            <p><span className="text-neon-purple">Languages:</span> Python 3, Bash, TypeScript, JavaScript</p>
            <p><span className="text-neon-purple">AI / Vision:</span> OpenCV, YOLO v8, NumPy</p>
          </div>
        );
        break;

      case 'bio':
      case 'whoami':
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="text-neon-cyan font-bold">SHIVAM KUMAR SAH</p>
            <p>Role: DevOps Engineer @ EyesOnCloud Pvt. Ltd.</p>
            <p>Location: Bengaluru, Karnataka, India</p>
            <p>Education: B.E. in CSE, KNSIT (VTU), Bengaluru (May 2025 | CGPA: 8.54)</p>
            <p>Languages: English, Hindi, Nepali</p>
            <p>Core Focus: Jenkins CI/CD, Ansible/AWX, Docker, Linux, Bash/Python Automation</p>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="text-neon-cyan font-bold">CONTACT CHANNELS:</p>
            <p>Email: <a href="mailto:shivamk.sah2003@gmail.com" className="text-neon-green hover:underline">shivamk.sah2003@gmail.com</a></p>
            <p>Phone: +91 9019408318</p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/shivam-kumar-sah-9b91a1387" target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:underline">shivam-kumar-sah-9b91a1387</a></p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
      case 'quit':
        setIsOpen(false);
        setInput('');
        return;

      default:
        output = (
          <p className="text-red-400">
            Command not recognized: &apos;{trimmed}&apos;. Type <span className="text-neon-cyan font-bold">help</span> to view available commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: cmdStr, output }]);
    setInput('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
  };

  return (
    <>
      {/* Floating Trigger Button in Navbar / HUD */}
      <button onClick={() => setIsOpen(true)}
        className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-mono transition-all"
        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--neon-cyan)' }}
        title="Open Terminal CLI (Ctrl + K)">
        <Terminal size={13} />
        <span>CLI_MODE</span>
        <span className="px-1.5 py-0.5 rounded border text-[9px] font-bold"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-3)' }}>
          Ctrl+K
        </span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="terminal-window w-full max-w-2xl shadow-2xl border border-neon-cyan/50 overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Header Bar */}
            <div className="terminal-titlebar justify-between">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-neon-cyan" />
                <span className="font-mono text-xs font-bold text-neon-cyan">shivam@devops-matrix:~$ (CLI Console)</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Terminal Body */}
            <div className="p-4 font-mono text-xs space-y-3 overflow-y-auto flex-1" style={{ background: 'var(--bg-card)' }}>
              <p className="text-slate-400">
                DevOps Interactive Terminal v2.0. Type <span className="text-neon-cyan font-bold">help</span> to list commands or <span className="text-neon-green font-bold">projects</span> to view repositories.
              </p>

              {/* History output */}
              {history.map((item, index) => (
                <div key={index} className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-neon-green">shivam@matrix:~$</span>
                    <span className="text-white font-bold">{item.command}</span>
                  </div>
                  <div className="pl-4">{item.output}</div>
                </div>
              ))}

              {/* Active Prompt Input */}
              <form onSubmit={handleFormSubmit} className="flex items-center gap-2 pt-2">
                <span className="text-neon-green shrink-0">shivam@matrix:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type command ('help', 'projects', 'skills')..."
                  className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-neon-cyan placeholder-slate-600"
                />
                <button type="submit" className="text-neon-cyan hover:text-white">
                  <CornerDownLeft size={14} />
                </button>
              </form>

              <div ref={bottomRef} />
            </div>

          </div>
        </div>
      )}
    </>
  );
}
