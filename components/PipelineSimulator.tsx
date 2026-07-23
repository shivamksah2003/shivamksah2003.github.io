'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, CheckCircle2, AlertCircle, Terminal, Server, Shield, Container, GitBranch, Cpu } from 'lucide-react';

interface LogEntry {
  stage: string;
  message: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

const pipelineStages = [
  { id: 'git',      name: 'FETCH_SOURCE',   icon: <GitBranch size={14} />, desc: 'Cloning repo & checking SHA-256' },
  { id: 'docker',   name: 'DOCKER_BUILD',   icon: <Container size={14} />, desc: 'Building multi-stage container image' },
  { id: 'security', name: 'SECOPS_AUDIT',   icon: <Shield size={14} />,    desc: 'Scanning vulnerability CVEs' },
  { id: 'ansible',  name: 'ANSIBLE_DEPLOY', icon: <Server size={14} />,    desc: 'Executing AWX playbook rollout' },
  { id: 'health',   name: 'HEALTH_CHECK',   icon: <CheckCircle2 size={14}/>,desc: 'Verifying HTTP 200 endpoints' },
];

export default function PipelineSimulator() {
  const [activeStage, setActiveStage] = useState<number>(-1);
  const [isRunning, setIsRunning]     = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [logs, setLogs]               = useState<LogEntry[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (stage: string, message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs((prev) => [...prev, { stage, message, timestamp: time, type }]);
  };

  const startPipeline = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setIsCompleted(false);
    setLogs([]);
    setActiveStage(0);

    // Stage 1: Git
    addLog('FETCH_SOURCE', 'Initiating deployment pipeline trigger...', 'info');
    await delay(600);
    addLog('FETCH_SOURCE', 'Git checkout branch: main (commit #8f32a1)', 'info');
    await delay(700);
    addLog('FETCH_SOURCE', 'Repository integrity verified. Integrity SHA-256 matches.', 'success');

    // Stage 2: Docker
    setActiveStage(1);
    addLog('DOCKER_BUILD', 'Parsing Dockerfile multi-stage build manifest...', 'info');
    await delay(600);
    addLog('DOCKER_BUILD', 'Building target image: shivam/prod-app:latest', 'info');
    await delay(800);
    addLog('DOCKER_BUILD', 'Layer cache hit 4/4. Container image compressed to 42.8MB.', 'success');

    // Stage 3: Security Audit
    setActiveStage(2);
    addLog('SECOPS_AUDIT', 'Running Trivy & Dependency-Check vulnerability scan...', 'info');
    await delay(700);
    addLog('SECOPS_AUDIT', '0 Critical, 0 High, 0 Medium vulnerabilities detected.', 'success');

    // Stage 4: Ansible Deploy
    setActiveStage(3);
    addLog('ANSIBLE_DEPLOY', 'Connecting to remote host inventory via SSH keypair...', 'info');
    await delay(600);
    addLog('ANSIBLE_DEPLOY', 'Executing Ansible Playbook: site_deploy.yml --extra-vars "env=production"', 'info');
    await delay(900);
    addLog('ANSIBLE_DEPLOY', 'PLAY RECAP: ok=12 changed=4 unreachable=0 failed=0', 'success');

    // Stage 5: Health Check
    setActiveStage(4);
    addLog('HEALTH_CHECK', 'Pinging endpoint GET https://shivamkumar.dev/health...', 'info');
    await delay(600);
    addLog('HEALTH_CHECK', 'HTTP status: 200 OK | Response latency: 12ms', 'success');
    await delay(400);
    addLog('DEPLOYMENT', '>>> PIPELINE EXECUTION SUCCESSFUL. ALL SYSTEMS OPERATIONAL. <<<', 'success');

    setIsRunning(false);
    setIsCompleted(true);
  };

  const resetPipeline = () => {
    setIsRunning(false);
    setIsCompleted(false);
    setActiveStage(-1);
    setLogs([]);
  };

  function delay(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
  }

  return (
    <div className="hud-card p-6 space-y-6">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4"
        style={{ borderColor: 'var(--border)' }}>
        <div>
          <span className="section-label flex items-center gap-1.5">
            <Cpu size={14} className="text-neon-cyan" /> INTERACTIVE_PIPELINE_SIMULATOR
          </span>
          <h3 className="font-display text-lg font-bold tracking-wide uppercase text-neon-cyan mt-0.5">
            CI/CD DEPLOYMENT MATRIX
          </h3>
        </div>

        <div className="flex items-center gap-3">
          {!isRunning && !isCompleted && (
            <button onClick={startPipeline} className="btn-neon-solid flex items-center gap-2">
              <Play size={14} />
              <span>RUN_PIPELINE</span>
            </button>
          )}

          {isRunning && (
            <button disabled className="btn-neon flex items-center gap-2 opacity-75 cursor-not-allowed">
              <div className="h-2 w-2 rounded-full bg-neon-cyan animate-ping" />
              <span>EXECUTING...</span>
            </button>
          )}

          {isCompleted && (
            <button onClick={resetPipeline} className="btn-neon flex items-center gap-2">
              <RotateCcw size={14} />
              <span>RESET_MATRIX</span>
            </button>
          )}
        </div>
      </div>

      {/* Stage Progress Nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {pipelineStages.map((stage, idx) => {
          const isActive    = activeStage === idx;
          const isDone      = activeStage > idx || isCompleted;
          const isPending   = activeStage < idx && !isCompleted;

          let statusBg    = 'var(--bg-surface)';
          let statusBorder= 'var(--border)';
          let statusColor = 'var(--text-3)';

          if (isDone) {
            statusBg     = 'rgba(0, 255, 136, 0.08)';
            statusBorder = 'var(--neon-green)';
            statusColor  = 'var(--neon-green)';
          } else if (isActive) {
            statusBg     = 'rgba(0, 245, 255, 0.12)';
            statusBorder = 'var(--neon-cyan)';
            statusColor  = 'var(--neon-cyan)';
          }

          return (
            <div key={stage.id} className="p-3 rounded border transition-all space-y-1.5"
              style={{ background: statusBg, borderColor: statusBorder }}>
              <div className="flex items-center justify-between font-mono text-[10px]" style={{ color: statusColor }}>
                <span className="flex items-center gap-1 font-bold">
                  {stage.icon} {stage.name}
                </span>
                {isDone && <CheckCircle2 size={12} className="text-neon-green" />}
                {isActive && <div className="h-1.5 w-1.5 rounded-full bg-neon-cyan animate-ping" />}
              </div>
              <p className="font-mono text-[9px] line-clamp-1" style={{ color: 'var(--text-3)' }}>
                {stage.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Real-Time Log Output Window */}
      <div className="terminal-window">
        <div className="terminal-titlebar justify-between">
          <div className="flex items-center gap-2">
            <Terminal size={12} className="text-neon-cyan" />
            <span className="font-mono text-xs text-neon-cyan">deployment_execution_stream.log</span>
          </div>
          <span className="font-mono text-[10px] text-neon-green">
            {isRunning ? 'STATUS: STREAMING...' : isCompleted ? 'STATUS: COMPLETED' : 'STATUS: IDLE'}
          </span>
        </div>

        <div className="p-4 font-mono text-xs space-y-1.5 max-h-56 overflow-y-auto" style={{ background: 'var(--bg-card)' }}>
          {logs.length === 0 ? (
            <p className="text-slate-500 italic">
              Click <span className="text-neon-cyan font-bold">[RUN_PIPELINE]</span> above to initiate the live build &amp; deployment simulation...
            </p>
          ) : (
            logs.map((log, i) => (
              <div key={i} className="flex items-start gap-2 leading-relaxed">
                <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
                <span className="text-neon-purple shrink-0">[{log.stage}]</span>
                <span className={
                  log.type === 'success' ? 'text-neon-green font-bold' :
                  log.type === 'warning' ? 'text-yellow-400' :
                  log.type === 'error'   ? 'text-red-400' : 'text-slate-200'
                }>
                  {log.message}
                </span>
              </div>
            ))
          )}
          <div ref={logEndRef} />
        </div>
      </div>
    </div>
  );
}
