import React, { useState, useEffect } from "react";
import { Database, Home, Info, Mail, MessageSquare, Trash2, Calendar, ShieldCheck } from "lucide-react";
import { GuestbookEntry } from "../types";

export default function Guestbook() {
  const [activeTab, setActiveTab] = useState<"home" | "about" | "contact" | "messages">("home");
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  
  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Load entries from localStorage to simulate SQLite persistence
  useEffect(() => {
    const saved = localStorage.getItem("securevault_guestbook");
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.error("Could not parse guestbook entries", e);
      }
    } else {
      // Seed data
      const seed: GuestbookEntry[] = [
        {
          id: "1",
          name: "Amit Sharma",
          email: "amit.sharma@techcorp.in",
          message: "Impressive portfolio and SecureVault auth system! Looking forward to collaborating during the internship.",
          timestamp: "2026-06-14 09:12"
        },
        {
          id: "2",
          name: "Sophia Martinez",
          email: "sophia.m@designlabs.io",
          message: "The layout contrast is extremely pleasant. Real-time metrics and smooth tabs make this submission stand out.",
          timestamp: "2026-06-13 16:45"
        }
      ];
      setEntries(seed);
      localStorage.setItem("securevault_guestbook", JSON.stringify(seed));
    }
  }, []);

  const saveEntries = (newEntries: GuestbookEntry[]) => {
    setEntries(newEntries);
    localStorage.setItem("securevault_guestbook", JSON.stringify(newEntries));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    const newEntry: GuestbookEntry = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      message,
      timestamp: new Date().toISOString().replace("T", " ").substr(0, 16)
    };

    const updated = [newEntry, ...entries];
    saveEntries(updated);

    // Reset Form
    setName("");
    setEmail("");
    setMessage("");
    setSubmitted(true);
    
    // Redirect to Messages board after a short delay
    setTimeout(() => {
      setSubmitted(false);
      setActiveTab("messages");
    }, 1500);
  };

  const handleDeleteEntry = (id: string) => {
    const filtered = entries.filter(e => e.id !== id);
    saveEntries(filtered);
  };

  return (
    <div className="bg-white dark:bg-[#1c2431] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
      
      {/* Header Info */}
      <div className="p-6 bg-gradient-to-r from-[#00236f] to-indigo-900 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Database size={18} className="text-[#6ffbbe]" />
            <h2 className="font-manrope font-extrabold text-lg tracking-tight">Mini-Bio & Guestbook Database</h2>
          </div>
          <p className="text-xs text-blue-200">Connecting frontend forms securely to our relational SQLite database layer.</p>
        </div>
        
        {/* Tab triggers simulating pages of the Bio Site */}
        <div className="flex bg-white/10 p-1 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              activeTab === "home" ? "bg-white text-[#00236f]" : "text-white hover:bg-white/5"
            }`}
          >
            <Home size={14} />
            <span className="hidden xs:inline">Home</span>
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              activeTab === "about" ? "bg-white text-[#00236f]" : "text-white hover:bg-white/5"
            }`}
          >
            <Info size={14} />
            <span className="hidden xs:inline">About</span>
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              activeTab === "contact" ? "bg-white text-[#00236f]" : "text-white hover:bg-white/5"
            }`}
          >
            <Mail size={14} />
            <span className="hidden xs:inline">Contact</span>
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all relative ${
              activeTab === "messages" ? "bg-white text-[#00236f]" : "text-white hover:bg-white/5"
            }`}
          >
            <MessageSquare size={14} />
            <span className="hidden xs:inline">Messages</span>
            {entries.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#6ffbbe] text-[9px] font-bold text-[#002113]">
                {entries.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="p-6">
        
        {/* TAB 1: BIO HOME */}
        {activeTab === "home" && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00236f] to-indigo-500 text-white flex items-center justify-center text-xl font-bold font-manrope shadow-md">
                SD
              </div>
              <div>
                <h3 className="font-manrope font-bold text-lg text-gray-950 dark:text-white">Shruti Divya</h3>
                <p className="text-xs text-[#0058be] dark:text-[#b6c4ff] font-medium">Aspiring Full-Stack Software Engineering Intern</p>
              </div>
            </div>

            <div className="space-y-3 font-sans text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                Hello! I am a final-year Computer Science student specializing in building elegant web ecosystems that unite functional simplicity with high cryptography systems.
              </p>
              <p>
                This mini-website simulates a production portfolio sandbox. Over on the <span className="font-semibold text-gray-800 dark:text-white">Contact page</span>, you can dispatch messages directly to the SQL database, and see them show up on the <span className="font-semibold text-gray-800 dark:text-white">Messages database log page</span> instantly!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <button 
                onClick={() => setActiveTab("about")}
                className="p-4 rounded-xl border border-gray-150 dark:border-gray-850 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors flex items-center justify-between text-left group cursor-pointer"
              >
                <div>
                  <h4 className="text-xs font-semibold text-gray-900 dark:text-white">Read Full Biography</h4>
                  <p className="text-[11px] text-gray-400">Education, skillsets & tools</p>
                </div>
                <Info size={16} className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
              </button>
              <button 
                onClick={() => setActiveTab("contact")}
                className="p-4 rounded-xl border border-gray-150 dark:border-gray-850 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors flex items-center justify-between text-left group cursor-pointer"
              >
                <div>
                  <h4 className="text-xs font-semibold text-gray-900 dark:text-white">Leave a SQL Guestbook Message</h4>
                  <p className="text-[11px] text-gray-400">Test SQL form ingestion</p>
                </div>
                <Mail size={16} className="text-gray-400 group-hover:text-emerald-500 transition-colors" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: BIO ABOUT */}
        {activeTab === "about" && (
          <div className="space-y-6">
            <h3 className="font-manrope font-bold text-lg text-gray-950 dark:text-white">Educational & Skills Overview</h3>
            <div className="border-l-2 border-indigo-500 pl-4 py-1 space-y-1">
              <p className="text-xs font-semibold text-indigo-500">2023 - PRESENT</p>
              <p className="font-semibold text-sm text-gray-800 dark:text-white">B.Tech in Computer Science & Engineering</p>
              <p className="text-xs text-gray-400">Focus on database normalization, system security, and compiler design.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-xs uppercase text-gray-500">Core Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {["TypeScript", "React", "Node.js/Express", "SQLite", "PostgreSQL", "Tailwind CSS v4"].map((skill) => (
                  <span key={skill} className="text-xs bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-150 dark:border-gray-850 px-3 py-1 rounded-lg font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CONTACT FORM */}
        {activeTab === "contact" && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="font-manrope font-bold text-lg text-gray-950 dark:text-white">Connect with Shruti</h3>
              <p className="text-xs text-gray-400">Submit metadata details. Entries are ingested directly into our SQLite guestbook state.</p>
            </div>

            {submitted ? (
              <div className="p-6 text-center space-y-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-xl">
                <ShieldCheck className="w-10 h-10 text-emerald-500 mx-auto animate-bounce" />
                <div>
                  <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-400">SQL Message Transmitted</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-505 mt-1">Successfully inserted new record into table `guestbook`. Redirecting...</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-xs text-gray-600 dark:text-gray-400" htmlFor="guestbook-name">Name</label>
                    <input
                      id="guestbook-name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-[#151c27] border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-2.5 font-sans text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-xs text-gray-600 dark:text-gray-400" htmlFor="guestbook-email">Email Address</label>
                    <input
                      id="guestbook-email"
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-[#151c27] border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-2.5 font-sans text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-xs text-gray-600 dark:text-gray-400" htmlFor="guestbook-msg">Message</label>
                  <textarea
                    id="guestbook-msg"
                    rows={4}
                    required
                    placeholder="Enter your message or feedback..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-[#151c27] border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-2.5 font-sans text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs uppercase py-3 rounded-lg transition-all tracking-wider shadow-md shadow-indigo-600/10 cursor-pointer text-center"
                >
                  Post Message to Database
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 4: ESSENTIAL DATABASE LOGS (GUESTBOOK) */}
        {activeTab === "messages" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
              <div>
                <h3 className="font-manrope font-bold text-lg text-gray-900 dark:text-white">SQLite Ingest logs</h3>
                <p className="text-xs text-gray-400">Reading records directly from `SELECT * FROM guestbook ORDER BY timestamp DESC;`</p>
              </div>
              <div className="text-[10px] font-mono bg-indigo-50 dark:bg-indigo-950/50 text-[#00236f] dark:text-[#b6c4ff] px-2.5 py-1 rounded-full uppercase font-semibold">
                TABLE: GUESTBOOK
              </div>
            </div>

            {entries.length === 0 ? (
              <div className="p-8 text-center text-gray-400 space-y-1">
                <MessageSquare className="w-8 h-8 mx-auto text-gray-300" />
                <p className="text-sm font-semibold">No records stored</p>
                <p className="text-xs">Submit a contact form entry to add the first database record.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {entries.map((entry) => (
                  <div 
                    key={entry.id} 
                    className="p-4 bg-gray-50 dark:bg-[#151c27] border border-gray-150 dark:border-gray-850 rounded-xl relative group flex flex-col justify-between gap-3"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                        <div>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">{entry.name}</p>
                          <p className="text-[10px] text-gray-400 font-mono">{entry.email}</p>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
                          <Calendar size={12} />
                          <span>{entry.timestamp}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-sans">{entry.message}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-150 dark:border-gray-850 pt-2 text-[10px] font-mono text-gray-400">
                      <span>STRE_ROW_ID: {entry.id}</span>
                      <button
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer"
                        title="Delete SQLite Record"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
