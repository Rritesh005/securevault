import React, { useState } from "react";
import { Shield, Eye, EyeOff, Terminal, Fingerprint, ArrowRight, Loader2, CheckCircle } from "lucide-react";

interface SecureVaultAuthProps {
  onLoginSuccess: (email: string, username: string) => void;
  initialMode?: "login" | "signup";
}

export default function SecureVaultAuth({ onLoginSuccess, initialMode = "login" }: SecureVaultAuthProps) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Signup specific states
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [strengthText, setStrengthText] = useState("Use a mix of letters, numbers, and symbols.");
  const [rememberMe, setRememberMe] = useState(false);

  // Authentication Status States
  const [loading, setLoading] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    let strength = 0;
    if (val.length === 0) {
      setPasswordStrength(0);
      setStrengthText("Use a mix of letters, numbers, and symbols.");
      return;
    }
    if (val.length > 5) strength++;
    if (val.length > 8 && /[A-Z]/.test(val)) strength++;
    if (val.length > 10 && /[0-9]/.test(val)) strength++;
    if (/[^A-Za-z0-9]/.test(val)) strength++;

    setPasswordStrength(strength);
    
    const labels = ["Weak password", "Fair password", "Good password", "Strong password"];
    setStrengthText(labels[strength - 1] || "Weak password");
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    
    setLoading(true);
    setErrorMessage("");
    
    // Simulate real database query/authentication
    setTimeout(() => {
      setLoading(false);
      setAuthSuccess(true);
      setTimeout(() => {
        // Fallback username if none registered
        const simulatedUser = email.split("@")[0] || "InternDeveloper";
        onLoginSuccess(email, simulatedUser);
      }, 1200);
    }, 1500);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }
    if (!email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    setTimeout(() => {
      setLoading(false);
      setAuthSuccess(true);
      setTimeout(() => {
        onLoginSuccess(email, username);
      }, 1200);
    }, 1500);
  };

  const handleQuickLogin = (role: string) => {
    setLoading(true);
    setErrorMessage("");
    setTimeout(() => {
      setLoading(false);
      setAuthSuccess(true);
      setTimeout(() => {
        onLoginSuccess(`${role.toLowerCase()}@securevault.com`, role);
      }, 1000);
    }, 1200);
  };

  // Strength Bar styling
  const getStrengthBarClass = (index: number) => {
    const base = "h-1 flex-1 rounded transition-all duration-300 ";
    if (index >= passwordStrength) return base + "bg-gray-200 dark:bg-gray-700";
    
    if (passwordStrength === 1) return base + "bg-red-500";
    if (passwordStrength === 2) return base + "bg-orange-400";
    if (passwordStrength === 3) return base + "bg-yellow-400";
    return base + "bg-emerald-500";
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] dark:bg-[#151c27] text-[#151c27] dark:text-[#f9f9ff] flex flex-col font-sans transition-colors duration-200">
      {/* Top Header */}
      <header className="fixed top-0 w-full bg-[#f9f9ff]/85 dark:bg-[#151c27]/85 backdrop-blur z-50 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between px-6 h-16 max-w-lg mx-auto w-full">
          <div className="flex items-center gap-2 cursor-pointer active:scale-95 transition-transform">
            <Shield className="text-[#00236f] dark:text-[#b6c4ff] w-6 h-6" />
            <span className="font-manrope text-xl text-[#00236f] dark:text-[#b6c4ff] font-extrabold tracking-tight">SecureVault</span>
          </div>
          <button 
            onClick={() => handleQuickLogin("Intern")}
            className="text-xs bg-[#e7eefe] hover:bg-[#dce2f3] dark:bg-[#1e3a8a] text-[#00236f] dark:text-[#b6c4ff] px-3 py-1.5 rounded-lg font-medium transition-colors"
          >
            Quick Demologin
          </button>
        </div>
      </header>

      {/* Main Canvas */}
      <main className="flex-grow flex items-center justify-center p-4 pt-24 pb-12">
        <div className="bg-white dark:bg-[#1c2431] w-full max-w-[440px] rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-md">
          {mode === "login" ? (
            /* LOGIN SCREEN */
            <div>
              <div className="mb-8">
                <h1 className="font-manrope text-[28px] md:text-32px font-bold text-gray-900 dark:text-white leading-9 tracking-tight mb-2">Welcome back</h1>
                <p className="font-sans text-sm md:text-base text-gray-500 dark:text-gray-400">Please enter your details to access your account.</p>
              </div>

              {errorMessage && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs font-medium border border-red-200 dark:border-red-900/50">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="flex flex-col gap-6">
                {/* Email Address */}
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-sm text-gray-700 dark:text-gray-300" htmlFor="login-email">Email address</label>
                  <input
                    id="login-email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading || authSuccess}
                    className="w-full bg-white dark:bg-[#151c27] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 font-sans text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0058be]/20 focus:border-[#0058be] transition-all disabled:opacity-50"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="font-medium text-sm text-gray-700 dark:text-gray-300" htmlFor="login-password">Password</label>
                    <a href="#" className="text-xs font-semibold text-[#0058be] hover:underline" onClick={(e) => { e.preventDefault(); alert("Demo mode: Please use Quick Demologin or check validation logic"); }}>Forgot password?</a>
                  </div>
                  <div className="relative">
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading || authSuccess}
                      className="w-full bg-white dark:bg-[#151c27] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 font-sans text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0058be]/20 focus:border-[#0058be] transition-all pr-12 disabled:opacity-50"
                    />
                    <button
                      type="button"
                      disabled={loading || authSuccess}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center gap-2">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={loading || authSuccess}
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-[#0058be] focus:ring-[#0058be]"
                  />
                  <label htmlFor="remember" className="text-sm text-gray-500 dark:text-gray-400 select-none">Remember for 30 days</label>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading || authSuccess}
                  className="w-full bg-[#00236f] hover:bg-[#001c59] text-white font-semibold py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer active:scale-[0.98]"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Authenticating...
                    </>
                  ) : authSuccess ? (
                    <>
                      <CheckCircle size={18} className="text-emerald-400" /> Success
                    </>
                  ) : (
                    "Login"
                  )}
                </button>

                {/* Sign up toggle */}
                <div className="text-center mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Don't have an account? 
                    <button
                      type="button"
                      onClick={() => setMode("signup")}
                      className="text-sm font-semibold text-[#0058be] hover:underline ml-1 cursor-pointer"
                    >
                      Create an account
                    </button>
                  </p>
                </div>
              </form>

              {/* Social Auth Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-100 dark:border-gray-800"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-[#1c2431]/100 px-3 text-gray-400 font-medium">Or continue with</span>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleQuickLogin("Developer")}
                  className="flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 rounded-lg py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors active:scale-95 cursor-pointer text-gray-700 dark:text-gray-200 font-medium text-sm"
                >
                  <Terminal size={18} className="text-gray-500" />
                  <span>SSO</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin("GuestAdmin")}
                  className="flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 rounded-lg py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors active:scale-95 cursor-pointer text-gray-700 dark:text-gray-200 font-medium text-sm"
                >
                  <Fingerprint size={18} className="text-gray-500" />
                  <span>Biometric</span>
                </button>
              </div>
            </div>
          ) : (
            /* SIGNUP SCREEN */
            <div>
              <div className="mb-6 text-center">
                <h1 className="font-manrope text-[28px] font-bold text-[#00236f] dark:text-[#b6c4ff] leading-9 tracking-tight mb-2">Create Account</h1>
                <p className="font-sans text-sm text-gray-500 dark:text-gray-400">Secure your identity with enterprise-grade encryption.</p>
              </div>

              {errorMessage && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs font-medium border border-red-200 dark:border-red-900/50">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSignupSubmit} className="flex flex-col gap-5">
                {/* Username */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400" htmlFor="signup-username">Username</label>
                  <input
                    id="signup-username"
                    type="text"
                    required
                    placeholder="Choose a unique ID"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading || authSuccess}
                    className="w-full bg-white dark:bg-[#151c27] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 font-sans text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0058be]/20 focus:border-[#0058be] transition-all"
                  />
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400" htmlFor="signup-email">Email Address</label>
                  <input
                    id="signup-email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading || authSuccess}
                    className="w-full bg-white dark:bg-[#151c27] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 font-sans text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0058be]/20 focus:border-[#0058be] transition-all"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400" htmlFor="signup-password">Password</label>
                  <div className="relative">
                    <input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="At least 8 characters"
                      value={password}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      disabled={loading || authSuccess}
                      className="w-full bg-white dark:bg-[#151c27] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 font-sans text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0058be]/20 focus:border-[#0058be] transition-all pr-12"
                    />
                    <button
                      type="button"
                      disabled={loading || authSuccess}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00236f] dark:hover:text-[#b6c4ff] transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator Bars */}
                  <div className="mt-2 flex gap-1 h-1">
                    <div className={getStrengthBarClass(0)}></div>
                    <div className={getStrengthBarClass(1)}></div>
                    <div className={getStrengthBarClass(2)}></div>
                    <div className={getStrengthBarClass(3)}></div>
                  </div>
                  
                  <p className={`text-xs mt-1 transition-colors ${
                    passwordStrength === 0 ? "text-gray-400" :
                    passwordStrength <= 2 ? "text-red-500 font-medium" : "text-emerald-500 font-semibold"
                  }`}>
                    {strengthText}
                  </p>
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400" htmlFor="signup-confirm">Confirm Password</label>
                  <input
                    id="signup-confirm"
                    type="password"
                    required
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading || authSuccess}
                    className="w-full bg-white dark:bg-[#151c27] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 font-sans text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0058be]/20 focus:border-[#0058be] transition-all"
                  />
                </div>

                {/* Submit Action */}
                <div className="mt-2">
                  <button
                    type="submit"
                    disabled={loading || authSuccess}
                    className="w-full py-3.5 bg-[#00236f] hover:bg-[#001c59] text-white font-semibold text-sm rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00236f]/10 cursor-pointer disabled:opacity-50 active:scale-[0.98]"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Creating Secure ID...
                      </>
                    ) : authSuccess ? (
                      <>
                        <CheckCircle size={18} className="text-emerald-400" /> Account Created
                      </>
                    ) : (
                      <>
                        <span>Sign Up</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>

                {/* Log in toggle */}
                <div className="text-center mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Already have an account? 
                    <button
                      type="button"
                      onClick={() => setMode("login")}
                      className="text-sm font-semibold text-[#0058be] hover:underline ml-1 cursor-pointer"
                    >
                      Log in instead
                    </button>
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full mt-auto pb-8 flex flex-col items-center gap-4 px-6 text-center">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs">
          <a href="#" className="text-gray-500 hover:text-[#00236f] dark:hover:text-[#b6c4ff] underline transition-colors" onClick={(e) => { e.preventDefault(); alert("Showcasing Internship Vault Security Whitepaper"); }}>Privacy Policy</a>
          <a href="#" className="text-gray-500 hover:text-[#00236f] dark:hover:text-[#b6c4ff] underline transition-colors" onClick={(e) => { e.preventDefault(); alert("Showcasing Internship Vault Security Whitepaper"); }}>Terms of Service</a>
          <a href="#" className="text-gray-500 hover:text-[#00236f] dark:hover:text-[#b6c4ff] underline transition-colors" onClick={(e) => { e.preventDefault(); alert("Showcasing SecureVault Cryptographic Whitepaper"); }}>Security Whitepaper</a>
        </div>
        <p className="text-xs text-gray-400">© 2024 SecureVault Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
