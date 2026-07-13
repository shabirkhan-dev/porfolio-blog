"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, ArrowRight, CheckCircle2, Database, RefreshCw, ShieldAlert, ShieldCheck, Users } from "lucide-react";

// 1. Autobay: Payload Optimization (Proving 50% lighter payloads)
export function PayloadTrace() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6">
      <div className="w-full max-w-[280px] rounded-lg border border-border bg-background-2 p-3 shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <span className="font-mono text-[0.6rem] uppercase text-faint tracking-wider">Network inspector</span>
          <div className="flex gap-1.5">
            <span className="size-2 rounded-full bg-border" />
            <span className="size-2 rounded-full bg-border" />
            <span className="size-2 rounded-full bg-border" />
          </div>
        </div>
        
        {/* Old Request */}
        <div className="flex items-center justify-between rounded bg-background p-2 border border-border/50">
          <div className="flex items-center gap-2">
            <div className="size-4 rounded-sm bg-muted/50 flex items-center justify-center font-mono text-[8px] text-faint">GET</div>
            <span className="font-mono text-xs text-muted-foreground">/api/v1/sync</span>
          </div>
          <span className="font-mono text-xs text-muted-foreground line-through decoration-red-500/50">1.2 MB</span>
        </div>

        {/* Arrow */}
        <div className="flex justify-center -my-1 relative z-10">
           <div className="bg-background-2 px-1">
             <ArrowRight size={14} className="rotate-90 text-faint" />
           </div>
        </div>

        {/* New Request */}
        <div className="relative overflow-hidden flex items-center justify-between rounded bg-accent/5 p-2 border border-accent/20">
          <motion.div 
            className="absolute inset-0 bg-accent/10"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "circOut", repeat: Infinity, repeatDelay: 2 }}
          />
          <div className="flex items-center gap-2 relative z-10">
            <div className="size-4 rounded-sm bg-accent/10 flex items-center justify-center font-mono text-[8px] text-accent">GET</div>
            <span className="font-mono text-xs text-foreground">/api/v2/stream</span>
          </div>
          <div className="flex items-center gap-1.5 relative z-10">
             <CheckCircle2 size={12} className="text-accent" />
             <span className="font-mono text-xs font-semibold text-accent">600 KB</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. School OS: Multi-Tenant Architecture
export function MultiTenantFlow() {
  const [activeTenant, setActiveTenant] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTenant((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const tenants = ["tenant_alpha", "tenant_beta", "tenant_gamma"];

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 w-full max-w-[280px]">
        {/* Tenants */}
        <div className="flex justify-between w-full gap-2 px-6">
          {[0, 1, 2].map((i) => (
            <div 
              key={i} 
              className={`relative flex-1 flex flex-col items-center gap-2 p-2 rounded-md border transition-colors duration-500 ${activeTenant === i ? 'border-accent bg-accent/5' : 'border-border bg-background'}`}
            >
              <div className={`size-6 rounded flex items-center justify-center ${activeTenant === i ? 'bg-accent/20 text-accent' : 'bg-muted text-faint'}`}>
                 <Users size={12} />
              </div>
              <div className="font-mono text-[8px] uppercase tracking-widest text-faint">School {i+1}</div>
              
              {/* Connection Line */}
              {activeTenant === i && (
                <motion.div 
                  className="absolute -bottom-6 w-px h-6 bg-accent"
                  initial={{ scaleY: 0, originY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Central DB */}
        <div className="relative w-40 rounded-xl border border-border bg-background p-4 flex flex-col items-center shadow-sm">
           <Database size={20} className="text-muted-foreground mb-2" />
           <div className="font-mono text-[9px] uppercase tracking-wider text-faint mb-1">Single Core DB</div>
           <div className="bg-background-2 border border-border rounded px-2 py-1 flex items-center gap-2 w-full justify-center">
              <span className="size-1.5 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs text-foreground">{tenants[activeTenant]}</span>
           </div>
        </div>
      </div>
    </div>
  );
}

// 3. RedCore: Security Policy Engine
export function PolicyEngine() {
  const [status, setStatus] = useState<"evaluating" | "passed" | "denied">("evaluating");

  useEffect(() => {
    let timeout1: ReturnType<typeof setTimeout> | undefined;
    let timeout2: ReturnType<typeof setTimeout> | undefined;
    
    const runCycle = () => {
      setStatus("evaluating");
      timeout1 = setTimeout(() => {
        setStatus(Math.random() > 0.3 ? "passed" : "denied");
        timeout2 = setTimeout(runCycle, 2000);
      }, 1000);
    };
    
    runCycle();
    
    return () => {
      if (timeout1) clearTimeout(timeout1);
      if (timeout2) clearTimeout(timeout2);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center p-6">
      <div className="w-full max-w-[280px] rounded-lg border border-border bg-[#0a0a0a] shadow-sm overflow-hidden font-mono">
        <div className="flex items-center gap-2 bg-[#111] px-3 py-2 border-b border-[#222]">
           <div className="size-2 rounded-full bg-red-500/50" />
           <div className="size-2 rounded-full bg-amber-500/50" />
           <div className="size-2 rounded-full bg-green-500/50" />
           <span className="text-[9px] text-[#666] ml-2">policy_evaluator.rs</span>
        </div>
        <div className="p-4 text-xs">
          <div className="text-[#888] mb-1">{"// evaluate request"}</div>
          <div className="flex gap-2">
            <span className="text-purple-400">let</span>
            <span className="text-blue-400">result</span>
            <span className="text-white">=</span>
            <span className="text-yellow-200">engine.check</span><span className="text-white">(req);</span>
          </div>
          
          <div className="mt-4 border-t border-[#222] pt-3 flex items-center justify-between">
             <div className="flex items-center gap-2">
               {status === "evaluating" && <RefreshCw className="size-3 text-[#666] animate-spin" />}
               {status === "passed" && <ShieldCheck className="size-3 text-green-400" />}
               {status === "denied" && <ShieldAlert className="size-3 text-red-400" />}
               <span className={`text-[10px] uppercase tracking-wider ${
                 status === "evaluating" ? "text-[#666]" :
                 status === "passed" ? "text-green-400" : "text-red-400"
               }`}>
                 {status === "evaluating" ? "Evaluating..." : status}
               </span>
             </div>
             {status === "passed" && <span className="text-[9px] text-[#666]">0.4ms</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. Excelorithm EMS: Scale Metrics
export function ScaleMetrics() {
  return (
    <div className="absolute inset-0 flex items-end justify-center p-6">
      <div className="w-full h-32 relative flex items-end">
        {/* Simulated Graph */}
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full absolute inset-0 overflow-visible">
          <motion.path
            d="M0,40 C20,35 30,30 40,32 C50,34 60,15 70,20 C80,25 90,5 100,2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-accent/30"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
          />
          {/* Fill under line */}
          <motion.path
            d="M0,40 C20,35 30,30 40,32 C50,34 60,15 70,20 C80,25 90,5 100,2 L100,40 L0,40 Z"
            fill="url(#gradient)"
            className="opacity-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>

        {/* Live Indicator */}
        <div className="absolute right-0 top-0 translate-x-1 -translate-y-1">
          <div className="relative flex items-center justify-center">
            <span className="absolute size-4 bg-accent/40 rounded-full animate-ping" />
            <span className="relative size-2 bg-accent rounded-full shadow-[0_0_8px_var(--accent)]" />
          </div>
        </div>
        
        {/* Stats Overlay */}
        <div className="absolute top-4 left-2 flex items-center gap-2">
           <Activity size={14} className="text-accent" />
           <div className="flex flex-col">
             <span className="font-mono text-sm font-semibold text-foreground leading-none">104,291</span>
             <span className="font-mono text-[8px] uppercase tracking-widest text-faint mt-1">Active Sessions</span>
           </div>
        </div>
      </div>
    </div>
  );
}

// 5. Starter Kit: CI/CD Pipeline (Just in case)
export function PipelineFlow() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6">
       <div className="flex items-center gap-2 w-full max-w-[280px]">
          <div className="size-8 rounded-full border border-border bg-background flex items-center justify-center shadow-sm shrink-0">
             <span className="font-mono text-xs text-foreground">PR</span>
          </div>
          <div className="h-px bg-border flex-1 relative">
             <motion.div 
               className="absolute top-1/2 -translate-y-1/2 size-1.5 bg-accent rounded-full"
               animate={{ left: ["0%", "100%"] }}
               transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
             />
          </div>
          <div className="flex gap-1 shrink-0">
             <div className="h-8 w-1.5 rounded-full bg-green-500/80" />
             <div className="h-8 w-1.5 rounded-full bg-green-500/80" />
             <div className="h-8 w-1.5 rounded-full bg-green-500/80" />
             <div className="h-8 w-1.5 rounded-full bg-accent/80 animate-pulse" />
          </div>
       </div>
    </div>
  );
}
