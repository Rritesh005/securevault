import React, { useState } from "react";
import { FileText, Copy, Trash2, Check } from "lucide-react";

export default function WordCounter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  // Success Criteria Logic:
  // Words: count of elements split by spaces (filtered for empty spaces)
  // Characters: exact length of string (including spaces)
  const getMetrics = () => {
    const trimmed = text.trim();
    const wordCount = trimmed === "" ? 0 : trimmed.split(/\s+/).length;
    const charCount = text.length;
    return { words: wordCount, characters: charCount };
  };

  const { words, characters } = getMetrics();

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoadSuccessDemo = () => {
    setText("Hello World");
  };

  return (
    <div className="bg-white dark:bg-[#1c2431] rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 rounded-xl">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-manrope font-bold text-lg text-gray-900 dark:text-white">Real-Time String Meter</h2>
            <p className="text-xs text-gray-400">Mastering string split arrays and length variables.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleLoadSuccessDemo}
            className="text-xs font-semibold bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-gray-700 transition-colors"
          >
            Load Success Criteria
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <label className="font-semibold text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400" htmlFor="paragraph-input">Paste Your Paragraph</label>
        <div className="relative">
          <textarea
            id="paragraph-input"
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste text directly here to watch analytics calculate in real-time..."
            className="w-full bg-gray-50 dark:bg-[#151c27] border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 font-sans text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
          />
          
          <div className="absolute right-3 bottom-3 flex gap-2">
            {text && (
              <>
                <button
                  onClick={handleCopy}
                  title="Copy text"
                  className="p-1.5 rounded-md bg-white dark:bg-[#1c2431] border border-gray-250 dark:border-gray-750 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 shadow-sm transition-colors cursor-pointer"
                >
                  {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
                <button
                  onClick={() => setText("")}
                  title="Clear text"
                  className="p-1.5 rounded-md bg-white dark:bg-[#1c2431] border border-gray-250 dark:border-gray-750 text-red-500 hover:text-red-650 dark:hover:text-red-400 shadow-sm transition-colors cursor-pointer"
                >
                  <Trash2 size={14} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Analytics Displays */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#f9f9ff] dark:bg-[#151c27] border border-gray-100 dark:border-gray-800 p-4 rounded-xl text-center space-y-1">
          <span className="text-[10px] font-mono tracking-wider uppercase text-gray-400">Words</span>
          <p className="font-manrope text-2xl md:text-3xl font-extrabold text-indigo-500">{words}</p>
        </div>
        <div className="bg-[#f9f9ff] dark:bg-[#151c27] border border-gray-100 dark:border-gray-800 p-4 rounded-xl text-center space-y-1">
          <span className="text-[10px] font-mono tracking-wider uppercase text-gray-400">Characters</span>
          <p className="font-manrope text-2xl md:text-3xl font-extrabold text-[#00236f] dark:text-[#b6c4ff]">{characters}</p>
        </div>
      </div>

      <div className="bg-[#e7eefe]/30 dark:bg-[#1e3a8a]/10 border border-[#dce1ff]/50 dark:border-[#1e3a8a]/20 p-4 rounded-xl">
        <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Standard Output Print Verification:</p>
        <div className="bg-white dark:bg-[#151c27] border border-gray-150 dark:border-gray-850 rounded-lg p-3 font-mono text-xs text-gray-600 dark:text-gray-400">
          Words: <span className="text-indigo-500 font-bold">{words}</span>, Characters: <span className="text-[#00236f] dark:text-[#b6c4ff] font-bold">{characters}</span>.
        </div>
      </div>
    </div>
  );
}
