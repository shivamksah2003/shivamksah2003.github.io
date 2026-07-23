import type { Metadata } from 'next';
import { Briefcase, GraduationCap, Award, CheckCircle2, Calendar, MapPin, ExternalLink, ShieldCheck, HeartHandshake, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Experience — Shivam Kumar Sah',
  description: 'Official career experience at EyesOnCloud Pvt. Ltd., KNSIT (VTU) education, competencies, and achievements.',
};

const experiences = [
  {
    period:   'FEBRUARY 2026 — PRESENT',
    role:     'DEVOPS ENGINEER',
    org:      'EyesOnCloud Pvt. Ltd. | Bengaluru, Karnataka',
    location: 'Bengaluru, Karnataka, India',
    badge:    'CURRENT_ENGAGEMENT',
    badgeClass:'border-neon-green text-neon-green bg-green-500/10',
    icon:     <Briefcase size={16} className="text-neon-green"/>,
    description: 'Lead DevOps practitioner responsible for containerising applications, automating deployment pipelines, and managing cloud infrastructure.',
    points: [
      'Designed and maintained automated CI/CD pipelines using Jenkins, streamlining what was previously a manual, multistep build and deployment process.',
      'Automated infrastructure provisioning and configuration management using Ansible and AWX, replacing repetitive manual server setup with reusable playbooks.',
      'Built and managed Docker containers to provide consistent development, testing, and production environments, reducing environment-related deployment issues.',
      'Administered Linux servers, including package management, service configuration, user administration, system monitoring, and troubleshooting.',
      'Developed automation scripts using Python and Bash to eliminate repetitive operational tasks and reduce manual intervention.',
      'Managed source code repositories and collaborative workflows using Git and GitHub.',
      'Collaborated with development teams to troubleshoot deployment issues and improve release reliability.',
      'Created and maintained YAML configuration files for infrastructure automation and deployment workflows.',
      'Assisted in production deployments while ensuring high system availability and deployment consistency.',
      'Documented deployment procedures, automation workflows, and operational best practices, making processes repeatable across the team.'
    ],
    tech: ['Jenkins', 'Docker', 'Ansible', 'AWX', 'CI/CD Pipelines', 'Linux (Ubuntu)', 'Python', 'Bash', 'AWS', 'Git', 'GitHub', 'YAML'],
  },
];

const education = [
  {
    period:   'GRADUATED: MAY 2025',
    degree:   'BACHELOR OF ENGINEERING (B.E.) — COMPUTER SCIENCE & ENGINEERING',
    org:      'KNS Institute of Technology (VTU), Bengaluru, Karnataka',
    cgpa:     '8.54 / 10.0',
    badge:    'DEGREE_CONFERRED',
    badgeClass:'border-neon-cyan text-neon-cyan bg-cyan-500/10',
    icon:     <GraduationCap size={16} className="text-neon-cyan"/>,
    description: 'Comprehensive study of computer science fundamentals, distributed systems, network security, operating systems, and AI computer vision.',
    points: [
      'Final-Year Project: AI-Powered Person Detection & Tracking System (YOLO + OpenCV)',
      'Academic Record: Graduated with CGPA 8.54 / 10.0 under Visvesvaraya Technological University (VTU)',
      'Built End-to-End CI/CD pipeline & containerised multi-tier web apps as primary research projects',
      'Developed core proficiency in Linux System Administration, Computer Networks, OS Architecture & AWS'
    ],
  },
];

const coreCompetencies = [
  'CI/CD', 'Infrastructure Automation', 'Configuration Management', 
  'Linux System Administration', 'Containerization', 'Infrastructure as Code (IaC)', 
  'Application Deployment', 'Release Management', 'Automation Scripting', 
  'Version Control', 'Server Administration', 'Performance Optimization', 
  'Troubleshooting & Root Cause Analysis', 'Technical Documentation'
];

const softSkills = [
  'Problem Solving', 'Analytical Thinking', 'Team Collaboration', 
  'Communication Skills', 'Adaptability', 'Time Management', 'Continuous Learning'
];

const languages = [
  { name: 'English', level: 'Full Professional' },
  { name: 'Hindi',   level: 'Full Professional' },
  { name: 'Nepali',  level: 'Native / Bilingual' }
];

export default function ExperiencePage() {
  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 grid-bg">
      <div className="mx-auto max-w-4xl space-y-12">

        {/* Page Header */}
        <div className="text-center">
          <span className="section-label">// OFFICIAL_CAREER_LOGS</span>
          <h1 className="font-display text-3xl font-black uppercase tracking-wider text-neon-cyan sm:text-4xl mt-1">
            EXPERIENCE &amp; <span className="neon-text-purple">EDUCATION</span>
          </h1>
          <p className="mt-3 text-xs sm:text-sm max-w-md mx-auto font-sans" style={{ color: 'var(--text-2)' }}>
            Verified industrial employment history, engineering credentials, and core competencies.
          </p>
        </div>

        {/* ─── Work Experience ─────────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 font-display text-xs font-bold tracking-widest uppercase text-neon-cyan">
            <Briefcase size={14} /> INDUSTRIAL_EMPLOYMENT
          </div>

          {experiences.map((exp) => (
            <div key={exp.role} className="hud-card p-6 space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b pb-4"
                style={{ borderColor: 'var(--border)' }}>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-display text-lg font-bold tracking-wide text-neon-cyan">{exp.role}</h2>
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded border font-bold ${exp.badgeClass}`}>
                      {exp.badge}
                    </span>
                  </div>
                  <p className="font-mono text-xs font-bold text-neon-purple mt-0.5">{exp.org}</p>
                </div>

                <div className="font-mono text-xs space-y-1 text-left sm:text-right" style={{ color: 'var(--text-3)' }}>
                  <div className="flex items-center gap-1.5 justify-start sm:justify-end">
                    <Calendar size={12} className="text-neon-cyan" /> {exp.period}
                  </div>
                  <div className="flex items-center gap-1.5 justify-start sm:justify-end">
                    <MapPin size={12} className="text-neon-green" /> {exp.location}
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed font-sans" style={{ color: 'var(--text-2)' }}>
                {exp.description}
              </p>

              {/* Bullet Points */}
              <div className="space-y-2 pt-2">
                <span className="font-mono text-[10px] text-neon-cyan font-bold">// KEY_RESPONSIBILITIES_&amp;_DELIVERABLES:</span>
                <ul className="space-y-2">
                  {exp.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 font-mono text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
                      <ShieldCheck size={14} className="text-neon-green shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Badges */}
              <div className="pt-4 border-t flex flex-wrap gap-1.5" style={{ borderColor: 'var(--border)' }}>
                {exp.tech.map((t) => (
                  <span key={t} className="font-mono text-[10px] px-2.5 py-1 rounded border font-bold"
                    style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--neon-green)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* ─── Education ──────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 font-display text-xs font-bold tracking-widest uppercase text-neon-cyan">
            <GraduationCap size={14} /> ACADEMIC_CREDENTIALS
          </div>

          {education.map((edu) => (
            <div key={edu.degree} className="hud-card p-6 space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b pb-4"
                style={{ borderColor: 'var(--border)' }}>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-display text-base font-bold tracking-wide uppercase text-neon-cyan">{edu.degree}</h2>
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded border font-bold ${edu.badgeClass}`}>
                      {edu.badge}
                    </span>
                  </div>
                  <p className="font-mono text-xs font-bold text-neon-purple mt-0.5">{edu.org}</p>
                </div>

                <div className="font-mono text-xs text-left sm:text-right" style={{ color: 'var(--text-3)' }}>
                  <div>{edu.period}</div>
                  <div className="text-neon-green font-bold">CGPA: {edu.cgpa}</div>
                </div>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed font-sans" style={{ color: 'var(--text-2)' }}>
                {edu.description}
              </p>

              <ul className="space-y-2">
                {edu.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 font-mono text-xs" style={{ color: 'var(--text-2)' }}>
                    <CheckCircle2 size={14} className="text-neon-cyan shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* ─── Core Competencies & Soft Skills ─────────────────── */}
        <section className="grid gap-6 sm:grid-cols-2">
          
          {/* Core Competencies */}
          <div className="hud-card p-6 space-y-4">
            <span className="section-label flex items-center gap-2">
              <Award size={14} /> CORE_COMPETENCIES
            </span>
            <div className="flex flex-wrap gap-1.5 font-mono text-xs">
              {coreCompetencies.map((cc) => (
                <span key={cc} className="px-2.5 py-1 rounded border text-[11px] font-bold"
                  style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--neon-cyan)' }}>
                  {cc}
                </span>
              ))}
            </div>
          </div>

          {/* Languages & Soft Skills */}
          <div className="hud-card p-6 space-y-4">
            <span className="section-label flex items-center gap-2">
              <Globe size={14} /> LANGUAGES_&amp;_SOFT_SKILLS
            </span>
            
            <div className="space-y-3 font-mono text-xs">
              <div className="space-y-1">
                <span className="text-neon-purple font-bold text-[10px]">// LANGUAGES:</span>
                <div className="flex flex-wrap gap-2">
                  {languages.map((l) => (
                    <span key={l.name} className="px-2 py-0.5 rounded border text-[11px]"
                      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-1)' }}>
                      {l.name} ({l.level})
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                <span className="text-neon-green font-bold text-[10px]">// SOFT_SKILLS:</span>
                <div className="flex flex-wrap gap-1.5">
                  {softSkills.map((ss) => (
                    <span key={ss} className="px-2 py-0.5 rounded border text-[10px]"
                      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-2)' }}>
                      {ss}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </section>

      </div>
    </main>
  );
}
