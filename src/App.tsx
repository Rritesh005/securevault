import React, { useState, useEffect } from "react";
import { Shield, LogOut, Sun, Moon, ArrowLeft, Menu, X, Terminal, GraduationCap } from "lucide-react";
import SecureVaultAuth from "./components/SecureVaultAuth";
import PortfolioHome from "./components/PortfolioHome";
import WordCounter from "./components/WordCounter";
import Guestbook from "./components/Guestbook";
import StickyNotes from "./components/StickyNotes";
import CryptoTracker from "./components/CryptoTracker";
import ImageGallery from "./components/ImageGallery";
import SearchAsYouType from "./components/SearchAsYouType";
import MultiStepForm from "./components/MultiStepForm";
import UserCards from "./components/UserCards";

export default function App() {
  const [session, setSession] = useState<{ email: string; username: string } | null>(null);
  const [showAuthScreen, setShowAuthScreen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [currentSandboxTab, setCurrentSandboxTab] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize Dark Mode based on localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("securevault_theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const darkActive = savedTheme === "dark" || (!savedTheme && systemPrefersDark);
    setIsDarkMode(darkActive);
    
    if (darkActive) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("securevault_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("securevault_theme", "light");
    }
  };

  const handleLoginSuccess = (email: string, username: string) => {
    setSession({ email, username });
    setShowAuthScreen(false);
    // Auto land on dashboard index/first sandbox tab
    setCurrentSandboxTab("dashboard");
  };

  const handleLogout = () => {
    setSession(null);
    setCurrentSandboxTab(null);
    setShowAuthScreen(false);
  };

  const handleSelectTaskFromPortfolio = (taskId: string) => {
    if (!session) {
      // Prompt auth with right mode
      setAuthMode("login");
      setShowAuthScreen(true);
      // Save intent to open this task after successful login
      setCurrentSandboxTab(taskId);
    } else {
      setCurrentSandboxTab(taskId);
    }
  };

  const getSandboxSandboxTitle = (id: string) => {
    switch (id) {
      case "dashboard": return "Portfolio Dashboard";
      case "counter": return "Word Counter Lab";
      case "guestbook": return "Multi-Page Bio & Guestbook";
      case "stickies": return "Interactive Sticky CRUD Board";
      case "crypto": return "Live Exchange Crypto Tracker";
      case "gallery": return "Media Gallery Ingest";
      case "search": return "Search-as-you-type Database";
      case "wizard": return "Enrollment Verification Wizard";
      case "users": return "Async User Card API Registry";
      default: return "Portfolio Sandbox";
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] dark:bg-[#151c27] text-gray-900 dark:text-gray-100 font-sans flex flex-col transition-colors duration-200">
      
      {/* GLOBAL NAVBAR (Visible everywhere except inside raw Auth Card if requested - but we make it look perfect!) */}
      {!showAuthScreen && (
        <header className="sticky top-0 w-full bg-[#f9f9ff]/85 dark:bg-[#151c27]/85 backdrop-blur z-50 border-b border-gray-150/60 dark:border-gray-800">
          <div className="flex items-center justify-between px-6 h-16 max-w-7xl mx-auto w-full">
            
            <button 
              onClick={() => { setCurrentSandboxTab(null); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 cursor-pointer active:scale-95 transition-transform text-left"
            >
              <Shield className="text-[#00236f] dark:text-[#b6c4ff] w-6 h-6" />
              <span className="font-manrope text-xl text-[#00236f] dark:text-[#b6c4ff] font-extrabold tracking-tight">SecureVault</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => setCurrentSandboxTab(null)}
                className={`text-sm font-semibold cursor-pointer transition-colors ${!currentSandboxTab ? "text-[#00236f] dark:text-[#b6c4ff]" : "text-gray-505 dark:text-gray-400 hover:text-[#00236f] dark:hover:text-white"}`}
              >
                Portfolio Home
              </button>
              
              {session && (
                <button 
                  onClick={() => setCurrentSandboxTab("dashboard")}
                  className={`text-sm font-semibold cursor-pointer transition-colors ${currentSandboxTab ? "text-[#00236f] dark:text-[#b6c4ff]" : "text-gray-520 dark:text-gray-400 hover:text-[#00236f]"}`}
                >
                  Sandbox Sandbox
                </button>
              )}

              {/* Dark mode toggle - Front-end Task 2 */}
              <button
                onClick={toggleDarkMode}
                id="global-theme-toggle"
                title="Toggle Dark Mode Preference"
                className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-amber-400 cursor-pointer"
              >
                {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {session ? (
                <div className="flex items-center gap-3 bg-[#e7eefe]/50 dark:bg-[#1e3a8a]/20 pl-3 pr-2 py-1 rounded-full border border-gray-100 dark:border-gray-800/80">
                  <span className="text-xs font-semibold text-[#00236f] dark:text-[#b6c4ff]">
                    Hi, {session.username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="p-1.5 rounded-full bg-white dark:bg-[#151c27] text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Logout Security Session"
                  >
                    <LogOut size={13} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setAuthMode("login"); setShowAuthScreen(true); }}
                  className="bg-[#00236f] hover:bg-[#001c59] text-white text-xs font-semibold uppercase tracking-wider py-2.5 px-5 rounded-xl transition-colors cursor-pointer"
                >
                  Secure Login
                </button>
              )}
            </div>

            {/* Mobile Nav Button */}
            <div className="flex items-center gap-3 md:hidden">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-amber-400 cursor-pointer"
              >
                {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 cursor-pointer"
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>

          </div>
        </header>
      )}

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && !showAuthScreen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white dark:bg-[#151c27] z-40 p-6 space-y-6 transition-all border-t border-gray-100 dark:border-gray-850">
          <div className="flex flex-col gap-4">
            <button
              onClick={() => { setCurrentSandboxTab(null); setMobileMenuOpen(false); }}
              className="w-full text-left font-semibold text-sm py-2 hover:text-[#0058be]"
            >
              Portfolio Home
            </button>
            
            {session && (
              <button
                onClick={() => { setCurrentSandboxTab("dashboard"); setMobileMenuOpen(false); }}
                className="w-full text-left font-semibold text-sm py-2 hover:text-[#0058be]"
              >
                Sandbox Dashboard
              </button>
            )}

            <div className="border-t border-gray-100 dark:border-gray-800 my-2"></div>

            {session ? (
              <div className="space-y-4">
                <p className="text-xs font-semibold text-gray-500">Logged in as {session.username}</p>
                <button
                  onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                  className="w-full bg-red-50 dark:bg-red-950/20 text-red-500 hover:bg-red-100 font-semibold text-sm py-2 px-4 rounded-xl text-center"
                >
                  Logout Session
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setAuthMode("login"); setShowAuthScreen(true); setMobileMenuOpen(false); }}
                className="w-full bg-[#00236f] text-white font-semibold text-sm py-3 rounded-xl text-center cursor-pointer"
              >
                Secure Login / Register
              </button>
            )}
          </div>
        </div>
      )}

      {/* CORE WORKSPACE ENTRY POINT */}
      <div className="flex-grow flex flex-col">
        {showAuthScreen ? (
          /* SecureVault Authentication View */
          <div className="flex-grow flex flex-col relative justify-center">
            {/* Simple exit option to return back to landing screen without signing in */}
            <button
              onClick={() => setShowAuthScreen(false)}
              className="absolute left-6 top-6 flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer bg-white dark:bg-[#1c2431] border border-gray-200 dark:border-gray-800 px-3 py-1.5 rounded-lg shadow-sm"
            >
              <ArrowLeft size={14} />
              <span>Exit Auth</span>
            </button>
            <SecureVaultAuth onLoginSuccess={handleLoginSuccess} initialMode={authMode} />
          </div>
        ) : !currentSandboxTab ? (
          /* Portfolio Landing Home view (Unauthenticated/Guest view) */
          <main className="flex-grow px-6 py-12 max-w-7xl mx-auto w-full">
            <PortfolioHome onSelectTask={handleSelectTaskFromPortfolio} username={session?.username || "Guest Evaluator"} />
          </main>
        ) : (
          /* Authenticated / Dashboard Hub View */
          <div className="flex-grow max-w-7xl mx-auto w-full px-6 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar sandbox menu */}
            <aside className="lg:col-span-1 space-y-6">
              <div className="bg-white dark:bg-[#1c2431] border border-gray-100 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-gray-800">
                  <GraduationCap className="text-[#0058be]" size={18} />
                  <h3 className="font-manrope font-bold text-sm text-gray-950 dark:text-white">Workspace Lab Navigator</h3>
                </div>

                <div className="flex flex-col gap-1 text-xs">
                  <button
                    onClick={() => setCurrentSandboxTab("dashboard")}
                    className={`text-left font-semibold px-3 py-2.5 rounded-xl transition-all ${
                      currentSandboxTab === "dashboard" ? "bg-[#00236f]/10 text-[#00236f] dark:bg-indigo-950/40 dark:text-[#b6c4ff]" : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-530 dark:text-gray-400"
                    }`}
                  >
                    🚀 Interactive Showcase Home
                  </button>

                  <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider pt-3 pb-1 px-3">
                    String & Algorithmic
                  </div>
                  <button
                    onClick={() => setCurrentSandboxTab("counter")}
                    className={`text-left px-3 py-2 rounded-xl font-medium transition-all ${
                      currentSandboxTab === "counter" ? "bg-[#00236f]/10 text-[#00236f] dark:bg-indigo-950/40 dark:text-[#b6c4ff]" : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-505 dark:text-gray-405"
                    }`}
                  >
                    1. Real-time Word Counter
                  </button>

                  <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider pt-3 pb-1 px-3">
                    Full-Stack Protocols
                  </div>
                  <button
                    onClick={() => setCurrentSandboxTab("guestbook")}
                    className={`text-left px-3 py-2 rounded-xl font-medium transition-all ${
                      currentSandboxTab === "guestbook" ? "bg-[#00236f]/10 text-[#00236f] dark:bg-indigo-950/40 dark:text-[#b6c4ff]" : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-505 dark:text-gray-405"
                    }`}
                  >
                    1. Bio Guestbook Form
                  </button>
                  <button
                    onClick={() => setCurrentSandboxTab("stickies")}
                    className={`text-left px-3 py-2 rounded-xl font-medium transition-all ${
                      currentSandboxTab === "stickies" ? "bg-[#00236f]/10 text-[#00236f] dark:bg-indigo-950/40 dark:text-[#b6c4ff]" : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-505 dark:text-gray-405"
                    }`}
                  >
                    2. Golden Sticky Note CRUD
                  </button>
                  <button
                    onClick={() => setCurrentSandboxTab("crypto")}
                    className={`text-left px-3 py-2 rounded-xl font-medium transition-all ${
                      currentSandboxTab === "crypto" ? "bg-[#00236f]/10 text-[#00236f] dark:bg-indigo-950/40 dark:text-[#b6c4ff]" : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-505 dark:text-gray-405"
                    }`}
                  >
                    3. Live Exchange Tracker
                  </button>
                  <button
                    onClick={() => setCurrentSandboxTab("gallery")}
                    className={`text-left px-3 py-2 rounded-xl font-medium transition-all ${
                      currentSandboxTab === "gallery" ? "bg-[#00236f]/10 text-[#00236f] dark:bg-indigo-950/40 dark:text-[#b6c4ff]" : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-505 dark:text-gray-405"
                    }`}
                  >
                    5. Secure Image Gallery
                  </button>

                  <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider pt-3 pb-1 px-3">
                    Front-End Sandbox
                  </div>
                  <button
                    onClick={() => setCurrentSandboxTab("search")}
                    className={`text-left px-3 py-2 rounded-xl font-medium transition-all ${
                      currentSandboxTab === "search" ? "bg-[#00236f]/10 text-[#00236f] dark:bg-indigo-950/40 dark:text-[#b6c4ff]" : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-530 dark:text-gray-400"
                    }`}
                  >
                    3. Dynamic Search List
                  </button>
                  <button
                    onClick={() => setCurrentSandboxTab("wizard")}
                    className={`text-left px-3 py-2 rounded-xl font-medium transition-all ${
                      currentSandboxTab === "wizard" ? "bg-[#00236f]/10 text-[#00236f] dark:bg-indigo-950/40 dark:text-[#b6c4ff]" : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-530 dark:text-gray-400"
                    }`}
                  >
                    4. Multi-Step Sign Wizard
                  </button>
                  <button
                    onClick={() => setCurrentSandboxTab("users")}
                    className={`text-left px-3 py-2 rounded-xl font-medium transition-all ${
                      currentSandboxTab === "users" ? "bg-[#00236f]/10 text-[#00236f] dark:bg-indigo-950/40 dark:text-[#b6c4ff]" : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-530 dark:text-gray-400"
                    }`}
                  >
                    5. Fetch User Profile Cards
                  </button>
                </div>
              </div>

              {/* Sidebar Quick Back Link */}
              <button
                onClick={() => setCurrentSandboxTab(null)}
                className="w-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1c2431]/40 py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-850 transition-colors text-xs font-semibold cursor-pointer text-gray-600 dark:text-gray-300 shadow-sm"
              >
                <ArrowLeft size={14} />
                <span>Return to Portfolio Home</span>
              </button>
            </aside>

            {/* Main Stage dynamic view */}
            <main className="lg:col-span-3 space-y-6">
              
              <div className="flex items-center justify-between bg-white dark:bg-[#1c2431]/40 border border-gray-100 dark:border-gray-800 px-5 py-3 rounded-2xl">
                <div>
                  <span className="text-[10px] font-mono font-semibold tracking-wider text-indigo-500 uppercase">Interactive Stage</span>
                  <h1 className="font-manrope text-base font-bold text-gray-900 dark:text-white leading-tight">
                    {getSandboxSandboxTitle(currentSandboxTab)}
                  </h1>
                </div>
                <div className="text-[10px] font-mono text-gray-400 uppercase">
                  VIEW_PORTAL // IND_3840
                </div>
              </div>

              {/* Dynamic load components according to selection tab */}
              {currentSandboxTab === "dashboard" && (
                <PortfolioHome onSelectTask={setCurrentSandboxTab} username={session?.username || "Guest Evaluator"} />
              )}
              {currentSandboxTab === "counter" && <WordCounter />}
              {currentSandboxTab === "guestbook" && <Guestbook />}
              {currentSandboxTab === "stickies" && <StickyNotes />}
              {currentSandboxTab === "crypto" && <CryptoTracker />}
              {currentSandboxTab === "gallery" && <ImageGallery />}
              {currentSandboxTab === "search" && <SearchAsYouType />}
              {currentSandboxTab === "wizard" && <MultiStepForm />}
              {currentSandboxTab === "users" && <UserCards />}

            </main>
          </div>
        )}
      </div>

    </div>
  );
}
