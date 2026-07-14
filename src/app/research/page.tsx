import React from "react";
import { Download, Upload, Plus, Users, Mic, PenTool, Layers, CheckCircle2, Bot, SlidersHorizontal, Keyboard, RefreshCw, Zap, Globe, Lock, Monitor, Brain, FileText, Check } from "lucide-react";

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#0f172a] font-sans selection:bg-indigo-100 selection:text-indigo-900 relative overflow-hidden">
      {/* Background Auras */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] opacity-40 pointer-events-none flex justify-center blur-[120px]">
        <div className="w-1/2 h-full bg-blue-100 rounded-full mix-blend-multiply" />
        <div className="w-1/2 h-full bg-purple-100 rounded-full mix-blend-multiply -ml-40" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-xl flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full" />
          </div>
          <span className="font-bold text-lg tracking-tight">Speak ai</span>
        </div>
        
        <div className="hidden md:flex items-center bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-full px-1 shadow-sm">
          <a href="#" className="px-4 py-2 text-sm font-medium bg-white rounded-full shadow-sm text-black">Home</a>
          <a href="#" className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-black transition-colors">Pricing</a>
          <a href="#" className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-black transition-colors">User Guide</a>
          <a href="#" className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-black transition-colors">News</a>
          <a href="#" className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-black transition-colors">Changelog</a>
          <a href="#" className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-black transition-colors">APIs</a>
        </div>

        <div>
          <button className="bg-[#0f172a] text-white px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20">
            Download <Download className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-32 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 mb-8 shadow-sm">
          <PenTool className="w-3.5 h-3.5" />
          Write as fast as you imagine
        </div>
        
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-balance text-gray-900">
          We've typed for 150 <br className="hidden md:block" />
          Years. It's time to Speak
        </h1>
        
        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto text-balance">
          Speak ai turns your voice into clear text in real time, 
          for everything from AI prompts to essays.
        </p>

        {/* Floating Input Simulation */}
        <div className="relative flex items-center justify-center mb-24">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-100 z-20">
             <span className="text-sm font-medium text-gray-500">Hold</span>
             <kbd className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-xs text-gray-600 font-mono">Space</kbd>
             <span className="text-sm text-gray-600">and speak to outline s doc</span>
             <div className="w-1.5 h-4 bg-indigo-500 animate-pulse ml-1" />
          </div>

          {/* Floating Widget Context */}
          <div className="absolute right-0 top-[-60px] translate-x-1/2 flex items-center justify-center z-10">
            <div className="relative w-48 h-48 rounded-full border border-dashed border-gray-300 flex items-center justify-center animate-[spin_60s_linear_infinite]">
              <span className="absolute -top-3 bg-[#fafafa] px-2 text-xs font-medium text-gray-400 rotate-[15deg]">speak ai turns your voice into clear</span>
            </div>
            <div className="absolute inset-0 m-auto w-32 h-32 bg-white rounded-full shadow-2xl flex items-center justify-center border border-purple-100">
                <div className="flex items-center gap-1.5 text-indigo-600 font-medium">
                  <div className="flex items-center gap-0.5 h-6">
                    <div className="w-1 h-3 bg-indigo-600 rounded-full animate-pulse" />
                    <div className="w-1 h-5 bg-indigo-600 rounded-full animate-pulse delay-75" />
                    <div className="w-1 h-2 bg-indigo-600 rounded-full animate-pulse delay-150" />
                    <div className="w-1 h-4 bg-indigo-600 rounded-full animate-pulse delay-75" />
                  </div>
                  Hello!
                </div>
            </div>
          </div>
        </div>

        {/* Dashboard Mockup Layering */}
        <div className="relative max-w-4xl mx-auto mt-20 perspective-[1000px]">
          {/* Main App Window */}
          <div className="relative z-10 bg-white/80 backdrop-blur-xl rounded-2xl border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-4 overflow-hidden">
            <div className="flex items-center gap-2 mb-4 px-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-gray-100 px-4 py-1.5 rounded-md text-xs text-gray-500 font-mono flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-gray-300 flex items-center justify-center text-[8px] text-white">🔒</span>
                  https://speak.ai.app
                </div>
              </div>
              <div className="flex gap-2 text-gray-400">
                 <Upload className="w-4 h-4" />
                 <Plus className="w-4 h-4" />
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl border border-gray-100 p-8 min-h-[400px] text-left relative">
              <p className="text-lg leading-relaxed text-gray-700 font-medium">
                The rain had finally eased, <span className="line-through text-gray-400 decoration-gray-300">leaving</span> the streets washed in silver 
                light. Elena pulled her coat tighter, not against the cold, but 
                against the strange feeling that someone had been <span className="text-red-500 bg-red-50 px-1 rounded border-b border-red-200 cursor-pointer">following</span> her 
                since she left the café.
              </p>
              
              {/* Floating transcription popup inside mockup */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-indigo-900 rounded-full px-4 py-2 flex items-center gap-3 shadow-xl">
                 <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs">S</div>
                 <div className="flex items-center gap-0.5 h-4 opacity-70">
                    <div className="w-0.5 h-2 bg-white rounded-full" />
                    <div className="w-0.5 h-3 bg-white rounded-full" />
                    <div className="w-0.5 h-4 bg-white rounded-full" />
                    <div className="w-0.5 h-2 bg-white rounded-full" />
                    <div className="w-0.5 h-3 bg-white rounded-full" />
                 </div>
              </div>
            </div>
          </div>

          {/* Floating Stat Cards */}
          <div className="absolute top-12 -left-12 z-20 bg-white/90 backdrop-blur border border-white shadow-xl rounded-xl p-4 w-48 flex items-center gap-4 animate-[float_6s_ease-in-out_infinite]">
             <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
               <Users className="w-5 h-5" />
             </div>
             <div>
               <div className="text-2xl font-bold">250K</div>
               <div className="text-xs text-gray-500">Active Users</div>
             </div>
          </div>
          
          <div className="absolute -top-6 left-1/3 z-20 bg-white/90 backdrop-blur border border-white shadow-xl rounded-xl p-4 w-48 flex items-center gap-4 animate-[float_7s_ease-in-out_infinite_reverse]">
             <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
               <Download className="w-5 h-5" />
             </div>
             <div>
               <div className="text-2xl font-bold">2.5M</div>
               <div className="text-xs text-gray-500">Total Download</div>
             </div>
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="py-10 border-y border-gray-200/60 bg-white/50 backdrop-blur-sm relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
           <div className="flex items-center gap-2 font-bold text-xl"><Bot /> OpenAI</div>
           <div className="flex items-center gap-2 font-bold text-xl"><PenTool /> NovelAI</div>
           <div className="flex items-center gap-2 font-bold text-xl"><Layers /> Google AI</div>
           <div className="flex items-center gap-2 font-bold text-xl"><Zap /> Hugging Face</div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-32 px-6 max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-700 mb-4">
              <Layers className="w-3.5 h-3.5" /> How it works Speak ai
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              Built for the way <br /> you work
            </h2>
          </div>
          <div className="max-w-sm text-gray-500">
            Advanced features that give you more control, more accuracy, and a voice-to-text experience designed for the way you work.
            <button className="mt-4 px-4 py-2 border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
              Write with your Voice <Mic className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Your words, perfected */}
          <div className="col-span-1 md:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col justify-between overflow-hidden relative group">
             <div className="mb-10 max-w-md relative z-10">
                <h3 className="text-xl font-bold mb-2">Your words, perfected by AI</h3>
                <p className="text-gray-500 text-sm">Speak ai model trained on real workflows to understand natural speech, correct grammar, and preserve every word while refining your text in real time.</p>
             </div>
             <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 relative z-10 flex gap-4">
                <div className="w-1/3 space-y-4">
                  <div className="flex items-center gap-2 text-indigo-500 font-medium text-xs"><div className="w-1 h-3 bg-indigo-500 rounded-full" /> This Speak AI listens the w...</div>
                  <div className="flex items-center gap-2 text-indigo-500 font-medium text-xs"><div className="w-1 h-3 bg-indigo-500 rounded-full" /> Understands your words...</div>
                  <div className="flex items-center gap-2 text-indigo-500 font-medium text-xs"><div className="w-1 h-3 bg-indigo-500 rounded-full" /> As you talk, it cleans up gra...</div>
                </div>
                <div className="w-2/3 bg-white rounded-lg p-4 shadow-sm border border-gray-100 text-sm text-gray-600">
                  <p>...<span className="text-red-400 line-through">it cleans up</span> <span className="text-green-500 bg-green-50 px-1 rounded">it refines</span> grammar, making sure your meaning intact, <span className="text-blue-500 underline decoration-blue-300 underline-offset-4">and it happens</span> instantly.</p>
                </div>
             </div>
             {/* Gradient blob for card 1 */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </div>

          {/* Card 2: Writing style */}
          <div className="col-span-1 bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col justify-between overflow-hidden relative group">
             <div className="mb-10 relative z-10">
                <h3 className="text-xl font-bold mb-2">Writing style, your way</h3>
                <p className="text-gray-500 text-sm">Set your tone and rules. From lowercase Slack messages to structured docs.</p>
             </div>
             <div className="space-y-3 relative z-10">
                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 text-xs flex items-start gap-3">
                   <div className="bg-blue-100 p-1.5 rounded-md text-blue-600 shrink-0"><SlidersHorizontal className="w-3.5 h-3.5" /></div>
                   <div>
                     <span className="font-semibold text-gray-900 block mb-0.5">Use all lowercase (gen z) in iMessage, Slack</span>
                     <span className="text-gray-500">Don't start sentences with "And" or "Because".</span>
                   </div>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-xs flex items-center justify-between">
                   <div className="flex items-center gap-2 text-gray-500"><Keyboard className="w-3.5 h-3.5" /> New formatting rule</div>
                   <Plus className="w-3.5 h-3.5 text-gray-400" />
                </div>
             </div>
          </div>
          {/* Card 3: Custom dictionary */}
          <div className="col-span-1 bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col justify-between overflow-hidden relative group">
             <div className="mb-10 relative z-10">
                <h3 className="text-xl font-bold mb-2">Custom dictionary</h3>
                <p className="text-gray-500 text-sm">Teach Speak ai the words you use most.</p>
             </div>
             <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 flex items-center gap-2 relative z-10">
                <div className="flex-1 text-sm text-gray-400">Add new word...</div>
                <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white"><Plus className="w-3.5 h-3.5" /></div>
             </div>
          </div>

          {/* Card 4: Speaks your language */}
          <div className="col-span-1 bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col justify-between overflow-hidden relative group">
             <div className="mb-10 relative z-10">
                <h3 className="text-xl font-bold mb-2">Speaks your language</h3>
                <p className="text-gray-500 text-sm">Understands 49 languages with clarity.</p>
             </div>
             <div className="flex justify-center relative z-10 py-4">
                <div className="w-16 h-16 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center relative">
                   <Globe className="w-6 h-6 text-indigo-900" />
                   <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-[10px]">🇺🇸</div>
                   <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-[10px]">🇪🇸</div>
                </div>
             </div>
          </div>

          {/* Card 5: Secure history */}
          <div className="col-span-1 bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col justify-between overflow-hidden relative group">
             <div className="mb-10 relative z-10">
                <h3 className="text-xl font-bold mb-2">Secure transcript history</h3>
                <p className="text-gray-500 text-sm">Access your past transcripts securely.</p>
             </div>
             <div className="space-y-2 relative z-10">
                <div className="h-6 bg-gray-100 rounded-full w-full" />
                <div className="h-6 bg-gray-100 rounded-full w-5/6" />
                <div className="h-6 bg-gray-100 rounded-full w-4/6" />
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white shadow-lg"><Lock className="w-3 h-3" /></div>
             </div>
          </div>
        </div>

        {/* Small feature strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 border-t border-gray-100 pt-10">
           <div className="text-center px-4">
              <div className="mx-auto w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mb-4"><Layers className="w-5 h-5 text-gray-500" /></div>
              <h4 className="font-bold mb-2">Works with all your apps</h4>
              <p className="text-sm text-gray-500">Fits naturally into every app you use each day, without setup or friction.</p>
           </div>
           <div className="text-center px-4">
              <div className="mx-auto w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mb-4"><Brain className="w-5 h-5 text-gray-500" /></div>
              <h4 className="font-bold mb-2">Your thoughts set the pace</h4>
              <p className="text-sm text-gray-500">Keeps up with your ideas so you can focus on thinking, not typing.</p>
           </div>
           <div className="text-center px-4">
              <div className="mx-auto w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mb-4"><Monitor className="w-5 h-5 text-gray-500" /></div>
              <h4 className="font-bold mb-2">Your screen is its dictionary</h4>
              <p className="text-sm text-gray-500">Understands what's on your screen, from code syntax to everyday text.</p>
           </div>
        </div>
      </section>

      {/* Streaming Mode Section */}
      <section className="py-32 relative z-10 bg-gray-50/50 border-y border-gray-100 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
           <p className="text-3xl md:text-5xl font-medium text-gray-300 leading-tight mb-16 text-balance">
             The rain had finally eased, <span className="text-gray-900 font-semibold bg-white px-2 py-1 rounded shadow-sm">leaving the streets washed in silver light</span> Elena pulled her coat tighter, not against the cold, but against the 
             <span className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm mx-2">
               <div className="w-1 h-3 bg-black rounded-full" />
               <div className="w-1 h-5 bg-black rounded-full" />
               <div className="w-1 h-2 bg-black rounded-full" />
               <div className="w-1 h-4 bg-black rounded-full" />
             </span>
             feeling that someone had been following her since she left the café ☕
           </p>
           
           <div className="flex flex-col md:flex-row justify-between items-end gap-8 text-left mt-24">
             <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 mb-4">
                  <FileText className="w-3.5 h-3.5" /> Content Editing
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Streaming mode built for <br/> precise writing</h2>
             </div>
             <div className="max-w-xs text-sm text-gray-500">
                Capture your ideas as they come. Aqua processes every word in real time, refining phrasing, fixing grammar, and formatting text without delay.
                <button className="mt-4 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm">
                  Content Editing Speak AI <Zap className="w-3.5 h-3.5" />
                </button>
             </div>
           </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 px-6 max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-700 mb-4">
            <Lock className="w-3.5 h-3.5" /> Our Pricing Plan
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">Get started for free</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Starter */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col">
            <h3 className="text-xl font-bold mb-2">Starter</h3>
            <p className="text-sm text-gray-500 mb-6">Your writing partner. Unlock instant, world-class Voice to Text with a simple monthly fee.</p>
            <div className="text-3xl font-bold mb-6">Free Plan</div>
            <button className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-semibold transition-colors mb-8 flex items-center justify-center gap-2">
               <Download className="w-4 h-4" /> Download for Windows
            </button>
            <div className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">Get Started With</div>
            <ul className="space-y-3 text-sm text-gray-600 flex-1">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gray-900" /> 1,000 free words</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gray-900" /> Speak ai Engine</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gray-900" /> 5 Custom Dictionary values</li>
            </ul>
          </div>

          {/* Pro Plan */}
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-md flex flex-col relative overflow-hidden">
            <h3 className="text-xl font-bold mb-2">Pro Plan</h3>
            <p className="text-sm text-gray-500 mb-6">Your writing partner. Unlock instant, world-class Voice to Text with a simple monthly fee.</p>
            <div className="text-3xl font-bold mb-6">$8.00 <span className="text-sm text-gray-500 font-normal">/Month</span></div>
            <button className="w-full py-3 bg-gray-900 text-white hover:bg-gray-800 rounded-xl text-sm font-semibold transition-colors mb-8">
               Go Pro Plan
            </button>
            <div className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">Everything in Starter</div>
            <ul className="space-y-3 text-sm text-gray-600 flex-1">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gray-900" /> Unlimited words</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gray-900" /> Speak ai Engine</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gray-900" /> Avalon model</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gray-900" /> 800 Custom Dictionary values</li>
            </ul>
          </div>

          {/* Team Plan */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col">
            <h3 className="text-xl font-bold mb-2">Team Plan</h3>
            <p className="text-sm text-gray-500 mb-6">Your team writing partner. Unlock instant, world-class Voice to Text with a simple monthly fee.</p>
            <div className="text-3xl font-bold mb-6">$12.00 <span className="text-sm text-gray-500 font-normal">/Month</span></div>
            <button className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-semibold transition-colors mb-8 flex items-center justify-center gap-2">
               Get Started &rarr;
            </button>
            <div className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">Everything in Pro</div>
            <ul className="space-y-3 text-sm text-gray-600 flex-1">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gray-900" /> Centralized team billing</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gray-900" /> Team wide settings</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gray-900" /> Enforce privacy mode org-wide</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 border-t border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
           <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-200 rounded-full text-xs font-medium text-gray-600 mb-6">
                 <Download className="w-3.5 h-3.5" /> Download Now
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
                Let's your voice do<br/> the writing.
              </h2>
              <p className="text-gray-500 mb-8 max-w-md">
                Speak ai your thoughts and instantly turn them into polished updates that land in Windows.
              </p>
              <button className="py-3 px-6 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                 <Layers className="w-4 h-4" /> Download for Windows/MacOS
              </button>
           </div>
           <div className="flex-1 w-full max-w-md bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-xl relative">
              <div className="flex items-center justify-between mb-6 text-xs text-gray-400 font-mono">
                 <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-400"/><div className="w-2.5 h-2.5 rounded-full bg-amber-400"/><div className="w-2.5 h-2.5 rounded-full bg-green-400"/></div>
                 <div>6,400 characters  2,401 words</div>
                 <div className="w-4 h-4 border border-gray-300 rounded" />
              </div>
              <div className="text-sm font-medium mb-2">Chapter 2</div>
              <p className="text-sm text-gray-600 leading-relaxed">
                The rain had finally eased, leaving the <span className="text-blue-500 underline decoration-blue-300 underline-offset-2">streets washed</span> in silver light. Elena pulled her coat tighter, not against the cold, but against the strange feeling that <span className="bg-red-100 text-red-600 px-1 rounded">someone</span> had been following her since she left the café.
              </p>
              <div className="mt-8 flex justify-center">
                 <div className="bg-indigo-900 rounded-full px-4 py-2 flex items-center gap-3 shadow-xl">
                    <div className="flex items-center gap-0.5 h-4 opacity-70">
                       <div className="w-0.5 h-2 bg-white rounded-full" />
                       <div className="w-0.5 h-3 bg-white rounded-full" />
                       <div className="w-0.5 h-4 bg-white rounded-full" />
                       <div className="w-0.5 h-2 bg-white rounded-full" />
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 max-w-6xl mx-auto border-t border-gray-100 flex flex-col md:flex-row justify-between gap-8">
         <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
              <span className="font-bold tracking-tight">Speak ai</span>
            </div>
            <p className="text-sm text-gray-500 max-w-xs mb-6">
              Speak your thoughts and instantly turn them into polished updates that land in Slack.
            </p>
         </div>
         <div className="flex gap-16 text-sm">
            <div className="space-y-4">
               <a href="#" className="block text-gray-500 hover:text-gray-900">Home</a>
               <a href="#" className="block text-gray-500 hover:text-gray-900">User Guide</a>
               <a href="#" className="block text-gray-500 hover:text-gray-900">News</a>
            </div>
            <div className="space-y-4">
               <a href="#" className="block text-gray-500 hover:text-gray-900">About</a>
               <a href="#" className="block text-gray-500 hover:text-gray-900">Documentation</a>
               <a href="#" className="block text-gray-500 hover:text-gray-900">Updates</a>
            </div>
            <div className="space-y-4">
               <a href="#" className="block text-gray-500 hover:text-gray-900">Pricing</a>
               <a href="#" className="block text-gray-500 hover:text-gray-900">Download</a>
               <a href="#" className="block text-gray-500 hover:text-gray-900">Contact</a>
            </div>
         </div>
      </footer>

    </div>
  );
}
