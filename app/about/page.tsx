import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Download, MapPin, Briefcase, GraduationCap,
  Github, Linkedin, Phone, Mail, CheckCircle2,
  Server, Container, GitBranch, Terminal, Cpu, Cloud, ShieldCheck, Activity, Globe, HeartHandshake
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About — Shivam Kumar Sah',
  description: 'DevOps Engineer profile, background, academic credentials, and official career timeline.',
};

const skillModules = [
  { category: 'DEVOPS & AUTOMATION', icon: <GitBranch size={14} className="text-neon-cyan"/>, items: ['Jenkins', 'Docker', 'Ansible', 'AWX', 'CI/CD Pipelines'] },
  { category: 'OPERATING SYSTEMS',   icon: <Server size={14} className="text-neon-green"/>,    items: ['Linux (Ubuntu)', 'Windows OS', 'Virtual Machines'] },
  { category: 'PROGRAMMING & SCRIPTS',icon: <Terminal size={14} className="text-yellow-400"/>, items: ['Python 3', 'Bash Scripting', 'JavaScript (ES6+)', 'YAML'] },
  { category: 'CLOUD & INFRASTRUCTURE',icon: <Cloud size={14} className="text-neon-purple"/>, items: ['AWS (EC2, IAM, S3)', 'IaC', 'Docker Compose', 'SSH'] },
  { category: 'WEB & DATABASES',     icon: <Globe size={14} className="text-neon-pink"/>,      items: ['React.js', 'Next.js', 'Express.js', 'REST APIs', 'MySQL', 'MongoDB', 'Firebase'] },
  { category: 'AI & COMPUTER VISION',icon: <Cpu size={14} className="text-neon-blue"/>,       items: ['OpenCV', 'YOLO v8', 'NumPy', 'Python'] },
];

const timeline = [
  {
    period: 'FEBRUARY 2026 — PRESENT',
    role: 'DevOps Engineer',
    org: 'EyesOnCloud Pvt. Ltd. | Bengaluru, Karnataka',
    badge: 'PRESENT ROLE',
    badgeColor: 'border-neon-green text-neon-green bg-green-500/10',
    desc: 'Designing automated CI/CD pipelines in Jenkins, automating server infrastructure using Ansible and AWX playbooks, and managing containerized workloads with Docker on Linux environments.',
    icon: <Briefcase size={14} />,
  },
  {
    period: 'GRADUATED: MAY 2025',
    role: 'Bachelor of Engineering (B.E.) — Computer Science & Engineering',
    org: 'KNS Institute of Technology (VTU), Bengaluru, Karnataka',
    badge: 'CGPA: 8.54 / 10.0',
    badgeColor: 'border-neon-cyan text-neon-cyan bg-cyan-500/10',
    desc: 'Specialised in Computer Science & Engineering, operating systems, computer networking, and cloud automation. Completed capstone research on AI person detection and end-to-end CI/CD pipelines.',
    icon: <GraduationCap size={14} />,
  },
];

const languages = [
  { name: 'English', level: 'Full Professional Proficiency' },
  { name: 'Hindi',   level: 'Full Professional Proficiency' },
  { name: 'Nepali',  level: 'Native / Bilingual' },
];

const softSkills = [
  'Problem Solving', 'Analytical Thinking', 'Team Collaboration', 
  'Communication Skills', 'Adaptability', 'Time Management', 'Continuous Learning'
];

export default function AboutPage() {
  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 grid-bg">
      <div className="mx-auto max-w-5xl space-y-12">

        {/* ─── Profile HUD Card ────────────────────────────────────── */}
        <div className="hud-card overflow-hidden">
          
          {/* Banner */}
          <div className="relative h-48 w-full overflow-hidden border-b" style={{ borderColor: 'var(--border)' }}>
            <Image src="/images/hero.jpg" alt="DevOps banner" fill className="object-cover opacity-60" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-scifi-bg via-transparent to-scifi-bg opacity-80" />
            <div className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-widest text-neon-cyan">
              // OPERATIVE_ID: SK_SAH_2026
            </div>
          </div>

          {/* Profile Details */}
          <div className="relative px-6 pb-8 pt-4">
            
            {/* Avatar */}
            <div className="absolute -top-16 left-6 h-32 w-32 overflow-hidden rounded-xl border-2 shadow-2xl"
              style={{ borderColor: 'var(--neon)', boxShadow: '0 0 20px rgba(0,245,255,0.4)' }}>
              <Image src="/images/profile.jpg" alt="Shivam Kumar Sah" fill className="object-cover" priority />
            </div>

            <div className="pt-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="section-label">// OFFICIAL_RESUME_PROFILE</span>
                <h1 className="font-display text-3xl font-black tracking-wider uppercase sm:text-4xl text-neon-cyan mt-1">
                  SHIVAM KUMAR SAH
                </h1>
                <p className="mt-1 font-mono text-xs sm:text-sm" style={{ color: 'var(--text-2)' }}>
                  DevOps Engineer @ EyesOnCloud Pvt. Ltd. | Bengaluru, Karnataka, India
                </p>

                {/* Metadata badges */}
                <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-xs" style={{ color: 'var(--text-3)' }}>
                  <span className="flex items-center gap-1.5"><MapPin size={12} className="text-neon-cyan"/> Bengaluru, Karnataka, India</span>
                  <span className="flex items-center gap-1.5"><Briefcase size={12} className="text-neon-green"/> EyesOnCloud Pvt. Ltd.</span>
                  <span className="flex items-center gap-1.5"><GraduationCap size={12} className="text-yellow-400"/> KNSIT (VTU) · CGPA 8.54</span>
                  <span className="flex items-center gap-1.5"><Phone size={12} className="text-neon-purple"/> +91 9019408318</span>
                  <span className="flex items-center gap-1.5"><Mail size={12} className="text-neon-pink"/> shivamk.sah2003@gmail.com</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <a href="/resume.pdf" download="Shivam_Kumar_Sah_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-neon-solid flex items-center gap-2">
                  <Download size={14} />
                  <span>DOWNLOAD_RESUME</span>
                </a>
                <a href="https://github.com/shivamksah2003" target="_blank" rel="noopener noreferrer" className="btn-neon flex items-center gap-2">
                  <Github size={14} />
                  <span>GITHUB</span>
                </a>
                <a href="https://www.linkedin.com/in/shivam-kumar-sah-9b91a1387" target="_blank" rel="noopener noreferrer" className="btn-neon flex items-center gap-2">
                  <Linkedin size={14} />
                  <span>LINKEDIN</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Grid layout for Narrative & Timeline ─────────────────── */}
        <div className="grid gap-8 lg:grid-cols-3">
          
          {/* Main Story (Left 2 Cols) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Professional Summary */}
            <section className="hud-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border)' }}>
                <span className="section-label flex items-center gap-2">
                  <Terminal size={14} /> PROFESSIONAL_SUMMARY
                </span>
                <span className="font-mono text-[10px] text-neon-green">STATUS: ACTIVE</span>
              </div>
              <div className="space-y-3 font-sans text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                <p>
                  DevOps Engineer with hands-on experience building CI/CD pipelines (Jenkins), automating infrastructure with Ansible and AWX, and deploying containerized applications with Docker on Linux environments.
                </p>
                <p>
                  Skilled in Python and Bash scripting for release automation, with working knowledge of AWS (EC2, IAM, S3) and Infrastructure as Code practices. Focused on reducing manual effort and improving deployment reliability through automation.
                </p>
                <div className="p-3 rounded border font-mono text-xs"
                  style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
                  <span className="text-neon-cyan">$</span> <span style={{ color: 'var(--text-1)' }}>echo &quot;Focused on reducing manual effort and improving deployment reliability.&quot;</span>
                </div>
              </div>
            </section>

            {/* Career Timeline */}
            <section className="hud-card p-6 space-y-6">
              <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border)' }}>
                <span className="section-label flex items-center gap-2">
                  <Activity size={14} /> EXPERIENCE_&amp;_EDUCATION
                </span>
              </div>

              <div className="relative border-l-2 ml-3 space-y-8" style={{ borderColor: 'var(--border)' }}>
                {timeline.map((item) => (
                  <div key={item.role} className="relative pl-6">
                    <span className="absolute -left-[9px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-scifi-bg border-2 border-neon-cyan" />
                    
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-mono text-xs font-bold text-neon-cyan">{item.period}</span>
                      <span className={`font-mono text-[10px] px-2 py-0.5 rounded border font-bold ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="font-display text-base font-bold uppercase tracking-wide mt-1" style={{ color: 'var(--text-1)' }}>
                      {item.role}
                    </h3>
                    <p className="font-mono text-xs text-neon-purple mt-0.5">{item.org}</p>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Languages & Soft Skills */}
            <div className="grid gap-6 sm:grid-cols-2">
              
              {/* Languages */}
              <div className="hud-card p-6 space-y-4">
                <span className="section-label flex items-center gap-2">
                  <Globe size={14} /> LANGUAGES
                </span>
                <ul className="space-y-2.5 font-mono text-xs">
                  {languages.map((lang) => (
                    <li key={lang.name} className="flex items-center justify-between p-2 rounded border"
                      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
                      <span className="font-bold text-slate-100">{lang.name}</span>
                      <span className="text-neon-cyan text-[10px]">{lang.level}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Soft Skills */}
              <div className="hud-card p-6 space-y-4">
                <span className="section-label flex items-center gap-2">
                  <HeartHandshake size={14} /> SOFT_SKILLS
                </span>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {softSkills.map((ss) => (
                    <span key={ss} className="px-2 py-1 rounded border text-[11px]"
                      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--neon-green)' }}>
                      {ss}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Sidebar: Tech Modules */}
          <div className="space-y-6">
            <h2 className="section-label">// TECHNICAL_COMPETENCIES</h2>
            
            {skillModules.map(({ category, icon, items }) => (
              <div key={category} className="hud-card p-4 space-y-3">
                <div className="flex items-center gap-2 font-display text-xs font-bold tracking-wider uppercase" style={{ color: 'var(--text-1)' }}>
                  {icon}
                  {category}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <span key={item} className="font-mono text-[11px] px-2 py-1 rounded border"
                      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-2)' }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Quick Metrics */}
            <div className="hud-card p-4 space-y-2">
              <span className="section-label">// VERIFIED_METRICS</span>
              {[
                'B.E. CSE — KNSIT (VTU) CGPA 8.54',
                'DevOps Engineer @ EyesOnCloud',
                '4 Production Repositories Live',
                'YOLO AI Detection System Built'
              ].map(metric => (
                <div key={metric} className="flex items-center gap-2 font-mono text-xs" style={{ color: 'var(--text-2)' }}>
                  <ShieldCheck size={14} className="text-neon-green shrink-0" />
                  {metric}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
