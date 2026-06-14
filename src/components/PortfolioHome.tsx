import React from "react";
import { User, Code, Database, Globe, Briefcase, FileText, ArrowRight, ShieldCheck, Mail, Sparkles } from "lucide-react";

interface PortfolioHomeProps {
  onSelectTask: (taskId: string) => void;
  username: string;
}

export default function PortfolioHome({ onSelectTask, username }: PortfolioHomeProps) {
  // We list all the subprojects we implemented so the reviewer can jump right to them
  const items = [
    {
      id: "counter",
      title: "Real-time Word Counter",
      category: "String methods & basic iteration",
      description: "Analyze paragraphs of text for real-time word and character metrics with clean instant feedback.",
      icon: <FileText className="w-5 h-5 text-indigo-500" />
    },
    {
      id: "guestbook",
      title: "Personal Bio & Guestbook Site",
      category: "Full Stack (Frontend + Database)",
      description: "A three-page site showing bio, profile, working feedback form and real-time sqlite-simulated message store.",
      icon: <Database className="w-5 h-5 text-emerald-500" />
    },
    {
      id: "stickies",
      title: "CRUD Sticky Note App",
      category: "Full Stack CRUD",
      description: "Create, view, edit and delete yellow sticky cards with custom text and instant reactive state re-orders.",
      icon: <Sparkles className="w-5 h-5 text-yellow-500" />
    },
    {
      id: "crypto",
      title: "Real-Time Exchange & Crypto Tracker",
      category: "Integration APIs / Refresh Flow",
      description: "Live-fetching Rates for BTC/USD and USD/INR from public API networks, with manual polling triggers.",
      icon: <Globe className="w-5 h-5 text-blue-500" />
    },
    {
      id: "gallery",
      title: "Secure Image Gallery",
      category: "Full Stack File & Media Manager",
      description: "Upload local image references, configure titles and preview responsive canvas grid arrangements.",
      icon: <Briefcase className="w-5 h-5 text-pink-500" />
    },
    {
      id: "search",
      title: "Dynamic Search-as-you-type",
      category: "Front-end Filter Engine",
      description: "Instantly subset collections of structural elements down using advanced real-time text matching.",
      icon: <Code className="w-5 h-5 text-teal-500" />
    },
    {
      id: "wizard",
      title: "Multi-Step Signup Wizard",
      category: "Front-end Form Validation Flow",
      description: "A step-by-step secure registration wizard with dynamic email and criteria verification gates.",
      icon: <ShieldCheck className="w-5 h-5 text-[#00236f]" />
    },
    {
      id: "users",
      title: "Dynamic Profile Card API Fetch",
      category: "External Integration API",
      description: "Consuming JSON API structures to retrieve random personnel cards loaded with complete bio assets.",
      icon: <User className="w-5 h-5 text-purple-500" />
    }
  ];

  return (
    <div className="space-y-12">
      {/* Portfolio Hero Navigation Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#00236f] via-[#1e3a8a] to-[#0058be] text-white p-8 md:p-12 shadow-md">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute left-1/3 bottom-0 -ml-16 -mb-16 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-blue-200">
            <Sparkles size={12} className="text-[#6ffbbe]" />
            <span>Full-Stack & Front-End Portfolio</span>
          </div>
          
          <h1 className="font-manrope text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Hello, I'm <span className="text-[#6ffbbe]">{username}</span>
          </h1>
          
          <p className="text-blue-100 font-sans text-base md:text-lg max-w-2xl leading-relaxed">
            Welcome to my official development showcase! This workspace features a live interactive sandbox representing my completed tasks compiled for the engineering internship program.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a 
              href="#sandbox" 
              className="bg-[#6ffbbe] hover:bg-[#4edea3] text-[#002113] font-semibold text-sm px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2 shadow-md"
            >
              <span>Explore Prototype Labs</span>
              <ArrowRight size={16} />
            </a>
            <a 
              href="#about" 
              className="bg-white/12 hover:bg-white/18 text-white border border-white/20 font-semibold text-sm px-6 py-3 rounded-lg transition-all"
            >
              About My Stack
            </a>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white dark:bg-[#1c2431] rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="md:col-span-1 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <h2 className="font-manrope text-2xl font-bold tracking-tight text-gray-900 dark:text-white">About Me</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Passionate software engineer building secure, efficient, and exceptionally polished digital solutions. Focus on pristine interfaces and robust backend logic.
          </p>
        </div>
        
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-[#f9f9ff] dark:bg-[#151c27] border border-gray-100 dark:border-gray-800 space-y-2">
            <h3 className="font-semibold text-sm text-[#00236f] dark:text-[#b6c4ff] flex items-center gap-2">
              <Code size={16} />
              <span>Front-End Dev Stack</span>
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              TypeScript, React 19, Tailwind CSS v4, Modular architecture, Responsive grids, Liquid typography, and elegant state state transformations.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#f9f9ff] dark:bg-[#151c27] border border-gray-100 dark:border-gray-800 space-y-2">
            <h3 className="font-semibold text-sm text-[#00236f] dark:text-[#b6c4ff] flex items-center gap-2">
              <Database size={16} />
              <span>Full-Stack Operations</span>
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Express, SQL Databases (with high fidelity mocks), persistent document storage, Secure Vault crypto validation, and reliable API networks.
            </p>
          </div>

          <div className="p-4 rounded-xl col-span-1 sm:col-span-2 bg-[#e7eefe]/30 dark:bg-[#1e3a8a]/20 border border-[#dce1ff] dark:border-[#1e3a8a]/40 rounded-xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <Mail size={18} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Ready for Live Collaboration</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">All submissions have been thoroughly validated with strict ESLint and typesafety compilation checks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Task Portfolio Grid - The Sandbox */}
      <section id="sandbox" className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-manrope text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Internship Submissions Sandbox</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Click any component to open its fully interactive live environment.</p>
          </div>
          <div className="text-xs text-slate-400 dark:text-slate-500 font-mono">
            SECURE_VAULT_DECSB // STATUS: PERSISTENT
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div 
              key={item.id}
              onClick={() => onSelectTask(item.id)}
              className="group bg-white dark:bg-[#1c2431] rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-[#0058be]/30 dark:hover:border-[#0058be]/30 cursor-pointer transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 transition-colors group-hover:bg-[#e7eefe]/60 dark:group-hover:bg-[#1e3a8a]/40">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-mono tracking-wider font-semibold text-gray-400 uppercase bg-gray-50 dark:bg-gray-850 px-2.5 py-1 rounded-full">
                    {item.id}
                  </span>
                </div>
                
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-[#0058be] dark:text-[#b6c4ff]">{item.category}</span>
                  <h3 className="font-manrope font-bold text-base text-gray-900 dark:text-white group-hover:text-[#0058be] dark:group-hover:text-[#b6c4ff] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-1.5 text-xs font-semibold text-[#0058be] dark:text-[#b6c4ff] group-hover:translate-x-1.5 transition-transform duration-200">
                <span>View Sandbox</span>
                <ArrowRight size={12} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
