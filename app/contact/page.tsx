'use client';

import { useState, type FormEvent } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2, Mail, User, MessageSquare, Github, Linkedin, Phone, Terminal, Radio } from 'lucide-react';

type FormState = 'idle' | 'loading' | 'success' | 'error';

const contactInfo = [
  { icon: <Mail size={16} className="text-neon-cyan"/>,    label: 'PRIMARY_EMAIL',    value: 'shivamk.sah2003@gmail.com', href: 'mailto:shivamk.sah2003@gmail.com' },
  { icon: <Phone size={16} className="text-neon-green"/>,   label: 'COMMS_LINE',       value: '+91 9019408318',             href: 'tel:+919019408318' },
  { icon: <Github size={16} className="text-neon-purple"/>,  label: 'GITHUB_MATRIX',    value: 'github.com/shivamksah2003',  href: 'https://github.com/shivamksah2003' },
  { icon: <Linkedin size={16} className="text-neon-pink"/>, label: 'LINKEDIN_NETWORK', value: 'linkedin.com/in/shivam-kumar-sah-9b91a1387', href: 'https://www.linkedin.com/in/shivam-kumar-sah-9b91a1387' },
];

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [toastMsg,  setToastMsg]  = useState('');
  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState('loading');
    try {
      const res  = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, message }) });
      const data: { error?: string } = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Signal dispatch failed.');
      setFormState('success');
      setToastMsg('SIGNAL_TRANSMITTED: Message logged successfully. Response in < 24h.');
      setName(''); setEmail(''); setMessage('');
    } catch (err) {
      setFormState('error');
      setToastMsg(err instanceof Error ? err.message : 'Transmission failure. Please retry.');
    }
  }

  const isLoading = formState === 'loading';

  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 grid-bg">
      <div className="mx-auto max-w-5xl space-y-12">

        {/* Page Header */}
        <div className="text-center">
          <span className="section-label">// DISPATCH_COMMUNICATION</span>
          <h1 className="font-display text-3xl font-black uppercase tracking-wider text-neon-cyan sm:text-4xl mt-1">
            INITIATE <span className="neon-text-green">COMMS_LINK</span>
          </h1>
          <p className="mt-3 text-xs sm:text-sm max-w-md mx-auto font-sans" style={{ color: 'var(--text-2)' }}>
            Direct transmission endpoint for contract engagements, engineering inquiries, and DevOps consultations.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">

          {/* Left: Contact Channels */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="section-label">// DIRECT_ENDPOINTS</h2>

            {contactInfo.map(({ icon, label, value, href }) => (
              <a key={label} href={href} target={href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer"
                className="hud-card p-4 flex items-center gap-4 block">
                <div className="p-2.5 rounded border" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
                  {icon}
                </div>
                <div>
                  <p className="font-mono text-[10px] text-neon-cyan uppercase font-bold">{label}</p>
                  <p className="font-mono text-xs font-semibold break-all" style={{ color: 'var(--text-1)' }}>{value}</p>
                </div>
              </a>
            ))}

            {/* Terminal Channel Status */}
            <div className="terminal-window mt-6">
              <div className="terminal-titlebar">
                <Radio size={12} className="text-neon-green animate-pulse" />
                <span className="ml-2 font-mono text-xs text-neon-cyan">comms_channel.sys</span>
              </div>
              <div className="p-4 font-mono text-xs space-y-1" style={{ background: 'var(--bg-card)' }}>
                <p className="text-neon-green">✓ FREQUENCY: OPEN</p>
                <p className="text-neon-cyan">✓ RESPONSE_TIME: &lt; 24 HOURS</p>
                <p className="text-neon-purple">✓ ENCRYPTION: TLS 1.3 SECURE</p>
              </div>
            </div>
          </div>

          {/* Right: Sci-Fi Form Console */}
          <div className="lg:col-span-3">
            <div className="hud-card p-6 sm:p-8 space-y-6">
              
              <div className="border-b pb-4 flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
                <span className="section-label flex items-center gap-2">
                  <Terminal size={14} /> TRANSMISSION_CONSOLE
                </span>
                <span className="font-mono text-[10px] text-neon-green">BUFFER: READY</span>
              </div>

              <form id="contact-form" onSubmit={handleSubmit} noValidate className="space-y-4">

                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="font-mono text-xs text-neon-cyan flex items-center gap-1.5">
                    <User size={12} /> OPERATIVE_NAME:
                  </label>
                  <input id="contact-name" type="text" required minLength={1}
                    value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading}
                    placeholder="Enter your name / callsign..."
                    className="input-neon" />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="font-mono text-xs text-neon-cyan flex items-center gap-1.5">
                    <Mail size={12} /> EMAIL_ENDPOINT:
                  </label>
                  <input id="contact-email" type="email" required
                    value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading}
                    placeholder="you@domain.com"
                    className="input-neon" />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="font-mono text-xs text-neon-cyan flex items-center gap-1.5">
                    <MessageSquare size={12} /> SIGNAL_PAYLOAD:
                  </label>
                  <textarea id="contact-message" required minLength={10} rows={5}
                    value={message} onChange={(e) => setMessage(e.target.value)} disabled={isLoading}
                    placeholder="Transmit project details or technical inquiry..."
                    className="input-neon resize-none" />
                </div>

                {/* Status Alert Toast */}
                {formState !== 'idle' && formState !== 'loading' && (
                  <div className={`p-4 rounded border font-mono text-xs flex items-center gap-2 ${
                    formState === 'success' 
                      ? 'border-neon-green text-neon-green bg-green-500/10' 
                      : 'border-red-500 text-red-400 bg-red-500/10'
                  }`}>
                    {formState === 'success' ? <CheckCircle size={16}/> : <AlertCircle size={16}/>}
                    <span>{toastMsg}</span>
                  </div>
                )}

                <button type="submit" id="contact-submit-btn" disabled={isLoading} className="btn-neon-solid w-full flex items-center justify-center gap-2 py-3">
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>TRANSMITTING_SIGNAL...</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>DISPATCH_TRANSMISSION</span>
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
