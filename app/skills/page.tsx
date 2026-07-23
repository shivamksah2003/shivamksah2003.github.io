import type { Metadata } from 'next';
import Image from 'next/image';
import { Cpu, Terminal, Shield, Zap } from 'lucide-react';
import skillsData from '@/data/skills.json';

export const metadata: Metadata = {
  title: 'Skills — Shivam Kumar Sah',
  description: 'DevOps skill matrix, tools, automation proficiencies, and runtime systems.',
};

interface SkillItem { name: string; level: number; tag: string }
interface SkillGroup { category: string; icon: string; color: string; skills: SkillItem[] }

const groups = skillsData as SkillGroup[];

const tagClass: Record<string, string> = {
  Production: 'border-neon-green text-neon-green bg-green-500/10',
  Proficient: 'border-neon-cyan text-neon-cyan bg-cyan-500/10',
  Learning:   'border-yellow-400 text-yellow-400 bg-yellow-500/10',
};

const barGradient: Record<string, string> = {
  green:  'from-neon-green to-emerald-400',
  blue:   'from-neon-cyan to-blue-500',
  orange: 'from-orange-500 to-amber-400',
  cyan:   'from-cyan-400 to-teal-400',
  pink:   'from-neon-pink to-purple-500',
  indigo: 'from-neon-purple to-indigo-500',
};

export default function SkillsPage() {
  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 grid-bg">
      <div className="mx-auto max-w-6xl space-y-12">

        {/* Hero banner HUD */}
        <div className="hud-card relative overflow-hidden p-8 text-center sm:text-left">
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="section-label">// MATRIX_CAPABILITIES</span>
              <h1 className="font-display text-3xl font-black uppercase tracking-wider text-neon-cyan sm:text-4xl mt-1">
                SYSTEM <span className="neon-text-green">ARSENAL</span>
              </h1>
              <p className="mt-2 text-xs sm:text-sm max-w-xl font-sans" style={{ color: 'var(--text-2)' }}>
                Quantified breakdown of automation frameworks, infrastructure tooling, programming runtime environments, and AI computer vision frameworks.
              </p>
            </div>
            
            <div className="flex items-center gap-3 font-mono text-xs p-4 rounded border"
              style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
              <Zap size={20} className="text-neon-cyan animate-pulse" />
              <div>
                <div className="text-neon-green font-bold">ALL SYSTEMS GO</div>
                <div style={{ color: 'var(--text-3)' }}>100% AUTOMATED</div>
              </div>
            </div>
          </div>
        </div>

        {/* Skill Matrix Groups */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.category} className="hud-card p-6 flex flex-col justify-between space-y-6">

              <div>
                {/* Group Header */}
                <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-neon-cyan">#</span>
                    <h2 className="font-display text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-1)' }}>
                      {group.category}
                    </h2>
                  </div>
                  <Cpu size={14} className="text-neon-cyan opacity-60" />
                </div>

                {/* Skills list with glowing sci-fi bars */}
                <ul className="mt-5 space-y-4">
                  {group.skills.map((skill) => (
                    <li key={skill.name} className="space-y-1.5">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="font-bold" style={{ color: 'var(--text-1)' }}>{skill.name}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${tagClass[skill.tag] ?? tagClass['Learning']}`}>
                            {skill.tag}
                          </span>
                          <span className="text-neon-cyan font-bold">{skill.level}%</span>
                        </div>
                      </div>

                      {/* Sci-Fi Progress Bar */}
                      <div className="h-2 w-full rounded-full overflow-hidden p-0.5 border"
                        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${barGradient[group.color] ?? 'from-neon-cyan to-blue-500'} transition-all duration-1000 shadow-neon-cyan`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t font-mono text-[10px] text-right" style={{ borderColor: 'var(--border)', color: 'var(--text-3)' }}>
                MODULE_STATUS: VERIFIED
              </div>

            </div>
          ))}
        </div>

        {/* Terminal Diagnostic Block */}
        <div className="terminal-window">
          <div className="terminal-titlebar">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
            <span className="ml-3 font-mono text-xs text-neon-cyan">tooling_audit.sh</span>
          </div>
          <div className="p-6 font-mono text-xs space-y-2" style={{ background: 'var(--bg-card)' }}>
            <p><span className="text-neon-green">root@shivam:~#</span> docker --version && ansible --version | head -n 1</p>
            <p className="text-neon-cyan pl-4">Docker Engine v26.1.4 (Community Edition) [Active Daemon]</p>
            <p className="text-neon-purple pl-4">ansible [core 2.16.5] config = /etc/ansible/ansible.cfg</p>
            <p><span className="text-neon-green">root@shivam:~#</span> python3 -c &quot;import cv2, ultralytics; print(&apos;AI Engine: Ready&apos;)&quot;</p>
            <p className="text-neon-green pl-4">AI Engine: Ready (YOLOv8 + CUDA acceleration enabled)</p>
            <p><span className="text-neon-green">root@shivam:~#</span> <span className="animate-blink text-neon-cyan">_</span></p>
          </div>
        </div>

      </div>
    </main>
  );
}
