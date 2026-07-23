'use client';

import { useState } from 'react';
import { Layers, Server, Container, Database, Shield, Cpu, Activity, Terminal, ExternalLink } from 'lucide-react';

interface ArchNode {
  id: string;
  name: string;
  type: string;
  icon: React.ReactNode;
  port: string;
  status: string;
  details: {
    role: string;
    image?: string;
    config: string;
    health: string;
    network: string;
  };
}

const projectArchitectures: Record<string, { title: string; nodes: ArchNode[] }> = {
  'ci-cd-pipeline': {
    title: 'CI/CD Pipeline Topology',
    nodes: [
      {
        id: 'git',
        name: 'GitHub Repository',
        type: 'VERSION_CONTROL',
        icon: <Terminal size={18} className="text-neon-cyan" />,
        port: 'HTTPS / Webhook',
        status: 'ACTIVE_LISTENER',
        details: {
          role: 'Triggers automated webhook payload on git push to main branch.',
          config: 'Webhook Event: push | Target: http://jenkins.ci:8080/github-webhook/',
          health: '200 OK (0.02s ping latency)',
          network: 'GitHub Cloud API',
        },
      },
      {
        id: 'jenkins',
        name: 'Jenkins Master',
        type: 'ORCHESTRATOR',
        icon: <Cpu size={18} className="text-orange-400" />,
        port: '8080:8080',
        status: 'EXECUTING',
        details: {
          role: 'Orchestrates multi-stage build, linting, testing, and deployment stages.',
          image: 'jenkins/jenkins:lts-jdk17',
          config: 'Declarative Jenkinsfile with Docker Pipeline plugin',
          health: 'System load: 0.12 | JVM Heap: 512MB / 2GB',
          network: 'ci-internal-net',
        },
      },
      {
        id: 'docker',
        name: 'Docker Build Engine',
        type: 'CONTAINER_RUNTIME',
        icon: <Container size={18} className="text-neon-green" />,
        port: '2375 (Internal Daemon)',
        status: 'HEALTHY',
        details: {
          role: 'Executes multi-stage Dockerfile builds and tags production artifacts.',
          image: 'docker:26-dind',
          config: 'Multi-stage Dockerfile optimization | Layer Caching Enabled',
          health: 'Daemon status: Active (Running)',
          network: 'bridge',
        },
      },
      {
        id: 'deploy',
        name: 'Production Server Host',
        type: 'TARGET_INFRA',
        icon: <Server size={18} className="text-neon-purple" />,
        port: '443:80',
        status: 'ONLINE',
        details: {
          role: 'Zero-downtime container deployment host with health monitoring.',
          config: 'Systemd service + automated container restart policy',
          health: 'CPU: 8% | RAM: 1.2GB / 8GB | Uptime: 99.98%',
          network: 'prod-vpc-subnet',
        },
      },
    ],
  },
  'ansible-awx': {
    title: 'Ansible & AWX Automation Infrastructure',
    nodes: [
      {
        id: 'awx',
        name: 'AWX Controller Dashboard',
        type: 'CENTRAL_CONTROL',
        icon: <Cpu size={18} className="text-neon-purple" />,
        port: '8043 (HTTPS)',
        status: 'ONLINE',
        details: {
          role: 'Visual web UI & REST API for managing Ansible playbooks and RBAC.',
          image: 'quay.io/ansible/awx:latest',
          config: 'PostgreSQL database backend | JWT Authentication',
          health: 'REST API 200 OK | Jobs queued: 0',
          network: 'awx-control-net',
        },
      },
      {
        id: 'ansible',
        name: 'Ansible Playbook Engine',
        type: 'CONFIG_ENGINE',
        icon: <Shield size={18} className="text-red-400" />,
        port: '22 (SSH Transport)',
        status: 'RUNNING',
        details: {
          role: 'Idempotent task execution across multi-node Linux host inventories.',
          config: 'ansible.cfg | Inventory: hosts.ini | Roles: common, web, db',
          health: 'SSH Keypair handshake verified',
          network: 'ansible-exec-mesh',
        },
      },
      {
        id: 'nodes',
        name: 'Linux Target Hosts (20+ Nodes)',
        type: 'MANAGED_NODES',
        icon: <Server size={18} className="text-neon-green" />,
        port: '22 / 80 / 443',
        status: 'CONFIGURED',
        details: {
          role: 'Managed Linux servers automatically configured with firewall & security hardening.',
          config: 'UFW Firewall | Nginx webserver | Automated OS patches',
          health: 'All 20 hosts reachable (0 unreachable)',
          network: 'cloud-datacenter-vpc',
        },
      },
    ],
  },
  'three-tier-docker': {
    title: 'Three-Tier Docker Architecture',
    nodes: [
      {
        id: 'proxy',
        name: 'Nginx Reverse Proxy',
        type: 'FRONTEND_PROXY',
        icon: <Container size={18} className="text-neon-green" />,
        port: '80:80, 443:443',
        status: 'ROUTING',
        details: {
          role: 'Handles SSL termination, rate limiting, and reverse proxying to App tier.',
          image: 'nginx:alpine',
          config: 'nginx.conf | SSL Certificates | Proxy Pass: http://app:5000',
          health: 'Active connections: 142 | Request rate: 85 req/sec',
          network: 'frontend-net',
        },
      },
      {
        id: 'app',
        name: 'Backend Application Service',
        type: 'APPLICATION_TIER',
        icon: <Cpu size={18} className="text-neon-cyan" />,
        port: '5000 (Internal)',
        status: 'HEALTHY',
        details: {
          role: 'Processes business logic and queries database instance.',
          image: 'shivam/backend-app:v1.2',
          config: 'Gunicorn WSGI server | Gevent workers',
          health: 'Memory: 180MB | Worker threads: 4',
          network: 'frontend-net, backend-net',
        },
      },
      {
        id: 'db',
        name: 'MySQL Database Engine',
        type: 'DATABASE_TIER',
        icon: <Database size={18} className="text-yellow-400" />,
        port: '3306 (Internal)',
        status: 'PERSISTED',
        details: {
          role: 'Stores application state with named Docker volume persistence.',
          image: 'mysql:8.0',
          config: 'my.cnf | Volume mount: mysql_data:/var/lib/mysql',
          health: 'Queries/sec: 45 | InnoDB buffer pool: 512MB',
          network: 'backend-net',
        },
      },
    ],
  },
  'ai-detection': {
    title: 'AI Computer Vision Pipeline',
    nodes: [
      {
        id: 'camera',
        name: 'RTSP Camera / Video Stream',
        type: 'DATA_INPUT',
        icon: <Activity size={18} className="text-neon-cyan" />,
        port: '554 (RTSP)',
        status: 'STREAMING',
        details: {
          role: 'Captures live video frames at 1080p resolution @ 30 FPS.',
          config: 'H.264 video encoding stream',
          health: 'Stream bitrate: 4.5 Mbps | Frame loss: 0%',
          network: 'local-rtsp-net',
        },
      },
      {
        id: 'cv',
        name: 'OpenCV Preprocessor',
        type: 'FRAME_PROCESSOR',
        icon: <Cpu size={18} className="text-neon-green" />,
        port: 'Shared Memory',
        status: 'PROCESSING',
        details: {
          role: 'Resizes, normalizes, and converts video frames to PyTorch tensors.',
          config: 'OpenCV v4.9 | NumPy array normalization',
          health: 'Preprocess latency: 2.1ms per frame',
          network: 'memory-bus',
        },
      },
      {
        id: 'yolo',
        name: 'YOLO v8 Neural Model',
        type: 'AI_INFERENCE',
        icon: <Shield size={18} className="text-neon-pink" />,
        port: 'GPU Tensor Core',
        status: 'INFERRING',
        details: {
          role: 'Detects person bounding boxes and calculates confidence scores.',
          config: 'yolov8n.pt PyTorch model weights | CUDA 12 acceleration',
          health: 'Inference speed: 28.4 FPS | GPU Memory: 1.1GB',
          network: 'cuda-memory-bus',
        },
      },
    ],
  },
};

export default function ArchitectureInspector({ defaultSlug = 'ci-cd-pipeline' }: { defaultSlug?: string }) {
  const [activeSlug, setActiveSlug]   = useState<string>(defaultSlug);
  const [selectedNode, setSelectedNode] = useState<ArchNode>(
    projectArchitectures[defaultSlug]?.nodes[0] ?? projectArchitectures['ci-cd-pipeline'].nodes[0]
  );

  const currentArch = projectArchitectures[activeSlug] ?? projectArchitectures['ci-cd-pipeline'];

  return (
    <div className="hud-card p-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4"
        style={{ borderColor: 'var(--border)' }}>
        <div>
          <span className="section-label flex items-center gap-1.5">
            <Layers size={14} className="text-neon-cyan" /> INTERACTIVE_ARCHITECTURE_INSPECTOR
          </span>
          <h3 className="font-display text-lg font-bold tracking-wide uppercase text-neon-cyan mt-0.5">
            {currentArch.title}
          </h3>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex flex-wrap gap-1.5 font-mono text-xs">
          {Object.entries(projectArchitectures).map(([slug, data]) => (
            <button
              key={slug}
              onClick={() => {
                setActiveSlug(slug);
                setSelectedNode(data.nodes[0]);
              }}
              className={`px-3 py-1.5 rounded border transition-all ${
                activeSlug === slug
                  ? 'border-neon-cyan text-neon-cyan bg-cyan-500/10 font-bold'
                  : 'border-slate-800 text-slate-400 hover:text-slate-200'
              }`}>
              {slug === 'ci-cd-pipeline' ? 'CI/CD' : slug === 'ansible-awx' ? 'Ansible' : slug === 'three-tier-docker' ? 'Docker App' : 'AI Detection'}
            </button>
          ))}
        </div>
      </div>

      {/* Nodes Interactive Diagram Grid */}
      <div className="space-y-3">
        <span className="font-mono text-[10px] text-slate-400">// CLICK ANY NODE TO INSPECT LIVE INFRASTRUCTURE METRICS:</span>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {currentArch.nodes.map((node) => {
            const isSelected = selectedNode.id === node.id;
            return (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`p-4 rounded border text-left transition-all relative overflow-hidden group ${
                  isSelected
                    ? 'border-neon-cyan bg-cyan-500/10 shadow-neon-cyan'
                    : 'border-slate-800 bg-scifi-surface hover:border-slate-600'
                }`}>
                
                <div className="flex items-center justify-between mb-2">
                  {node.icon}
                  <span className="font-mono text-[9px] px-1.5 py-0.5 rounded border border-neon-green/30 text-neon-green bg-green-500/10">
                    {node.status}
                  </span>
                </div>

                <div className="font-display text-xs font-bold uppercase tracking-wider text-slate-100 group-hover:text-neon-cyan">
                  {node.name}
                </div>

                <div className="font-mono text-[10px] text-slate-400 mt-1">
                  PORT: {node.port}
                </div>

                {isSelected && (
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-neon-cyan animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Node Inspection Spec HUD */}
      {selectedNode && (
        <div className="terminal-window animate-fade-in">
          <div className="terminal-titlebar justify-between">
            <div className="flex items-center gap-2">
              <Terminal size={12} className="text-neon-cyan" />
              <span className="font-mono text-xs text-neon-cyan">
                NODE_INSPECTION_SPEC :: {selectedNode.name} [{selectedNode.type}]
              </span>
            </div>
            <span className="font-mono text-[10px] text-neon-green">PORT: {selectedNode.port}</span>
          </div>

          <div className="p-5 font-mono text-xs space-y-3 leading-relaxed" style={{ background: 'var(--bg-card)' }}>
            <div>
              <span className="text-neon-cyan font-bold">[ROLE_DESCRIPTION] </span>
              <span className="text-slate-200">{selectedNode.details.role}</span>
            </div>

            {selectedNode.details.image && (
              <div>
                <span className="text-neon-purple font-bold">[DOCKER_IMAGE] </span>
                <span className="text-neon-green">{selectedNode.details.image}</span>
              </div>
            )}

            <div>
              <span className="text-yellow-400 font-bold">[CONFIGURATION] </span>
              <span className="text-slate-300">{selectedNode.details.config}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
              <div>
                <span className="text-neon-green font-bold">[HEALTH_METRIC] </span>
                <span className="text-slate-300">{selectedNode.details.health}</span>
              </div>
              <div>
                <span className="text-neon-cyan font-bold">[NETWORK_DRIVER] </span>
                <span className="text-slate-300">{selectedNode.details.network}</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
