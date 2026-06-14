import React, { useState } from "react";
import { ListChecks, User, Key, Check, Loader2, ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorStatus, setErrorStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Verification helper for Step 1
  const validateStep1 = () => {
    if (!name.trim()) {
      setErrorStatus("Full Name parameter is required.");
      return false;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorStatus("Please enter a valid email containing a '@' symbol.");
      return false;
    }
    setErrorStatus("");
    return true;
  };

  // Verification helper for Step 2
  const validateStep2 = () => {
    if (password.length < 8) {
      setErrorStatus("Password must be at least 8 characters long.");
      return false;
    }
    if (password !== confirmPassword) {
      setErrorStatus("Confirm password must exactly match the password enter block.");
      return false;
    }
    setErrorStatus("");
    return true;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 2) {
      if (validateStep2()) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setStep(3);
        }, 1200);
      }
    }
  };

  const handleRestart = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrorStatus("");
    setStep(1);
  };

  return (
    <div className="bg-white dark:bg-[#1c2431] rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
      
      {/* Title Panel */}
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 text-blue-800 dark:text-[#b6c4ff] rounded-xl">
            <ListChecks className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-manrope font-bold text-lg text-gray-900 dark:text-white">Secure Enrollment Wizard</h2>
            <p className="text-xs text-gray-400 font-sans">Multi-step form wizard carrying strict client validations.</p>
          </div>
        </div>
        <div className="text-[10px] bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 px-2.5 py-1 rounded-full uppercase font-semibold font-mono">
          Form Wizard
        </div>
      </div>

      {/* Progress Wizard Bars */}
      <div className="flex items-center justify-between px-2">
        {[1, 2, 3].map((num) => (
          <React.Fragment key={num}>
            <div className="flex items-center gap-1.5 relative">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                step === num ? "bg-[#00236f] text-white ring-4 ring-[#00236f]/10" :
                step > num ? "bg-emerald-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-400"
              }`}>
                {step > num ? <Check size={14} /> : num}
              </div>
              <span className={`text-[11px] font-semibold hidden xs:inline ${
                step === num ? "text-[#00236f] dark:text-white" : "text-gray-400"
              }`}>
                {num === 1 ? "Credentials" : num === 2 ? "Password" : "Success"}
              </span>
            </div>
            {num < 3 && (
              <div className={`flex-grow h-0.5 mx-2 transition-all duration-300 ${
                step > num ? "bg-emerald-500" : "bg-gray-100 dark:bg-gray-800"
              }`}></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {errorStatus && (
        <div className="p-3 bg-red-50 dark:bg-red-955/20 border border-red-200/40 text-red-600 dark:text-red-400 text-xs font-medium rounded-xl">
          {errorStatus}
        </div>
      )}

      {/* STEP 1: Name and Email */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-gray-400">
            <User size={13} />
            <span>Step 1: Core Credentials</span>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400" htmlFor="wizard-name">Full Name</label>
              <input
                id="wizard-name"
                type="text"
                required
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#151c27] border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00236f]/20 focus:border-[#00236f]"
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400" htmlFor="wizard-email">Email Address</label>
              <input
                id="wizard-email"
                type="email"
                required
                placeholder="jane@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#151c27] border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00236f]/20 focus:border-[#00236f]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleNextStep}
              className="bg-[#00236f] hover:bg-[#001c59] text-white text-xs font-semibold uppercase tracking-wider py-2.5 px-5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Password and Password Confirmation */}
      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-gray-400">
            <Key size={13} />
            <span>Step 2: Password Encryption Setup</span>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400" htmlFor="wizard-p">Secure Password</label>
              <input
                id="wizard-p"
                type="password"
                required
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#151c27] border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00236f]/20 focus:border-[#00236f]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400" htmlFor="wizard-confirm">Confirm Password</label>
              <input
                id="wizard-confirm"
                type="password"
                required
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#151c27] border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00236f]/20 focus:border-[#00236f]"
              />
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-gray-600 dark:text-gray-300 text-xs font-semibold uppercase tracking-wider py-2.5 px-4 rounded-lg flex items-center gap-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className="bg-[#00236f] hover:bg-[#001c59] text-white text-xs font-semibold uppercase tracking-wider py-2.5 px-5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Verifying...
                </>
              ) : (
                <>
                  <span>Submit Form</span>
                  <Check size={14} />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: Success Message */}
      {step === 3 && (
        <div className="text-center p-8 space-y-4 bg-emerald-50 dark:bg-emerald-950/25 border border-emerald-100 dark:border-emerald-950/40 rounded-2xl">
          <ShieldCheck className="w-14 h-14 text-emerald-500 mx-auto animate-bounce" />
          
          <div className="space-y-1">
            <h3 className="font-manrope font-bold text-lg text-emerald-900 dark:text-emerald-400">Verification complete</h3>
            <p className="text-xs text-emerald-650 dark:text-emerald-500">Successfully instantiated account matching local credentials validation gates.</p>
          </div>

          {/* Table display summarizing inputs */}
          <div className="max-w-xs mx-auto bg-white dark:bg-[#151c27] border border-gray-150 dark:border-gray-850 p-4 rounded-xl text-left space-y-2 text-xs">
            <p className="border-b border-gray-100 dark:border-gray-800 pb-1 font-semibold text-[#00236f] dark:text-[#b6c4ff] uppercase tracking-wide text-[10px]">Registry Receipt</p>
            <p><span className="text-gray-400 font-medium font-sans">Name:</span> <strong className="text-gray-900 dark:text-white font-semibold">{name}</strong></p>
            <p><span className="text-gray-400 font-medium font-sans">Email:</span> <strong className="text-gray-900 dark:text-white font-mono">{email}</strong></p>
            <p><span className="text-gray-400 font-medium font-sans font-mono text-[10px]">PWD_HASH:</span> <span className="text-gray-400 font-mono italic">•••••••• (validated)</span></p>
          </div>

          <button
            onClick={handleRestart}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs uppercase tracking-wider py-2.5 px-6 rounded-lg transition-colors cursor-pointer"
          >
            Reset Wizard Mock
          </button>
        </div>
      )}

    </div>
  );
}
