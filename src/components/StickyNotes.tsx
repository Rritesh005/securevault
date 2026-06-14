import React, { useState, useEffect } from "react";
import { Sparkles, Trash2, Edit2, Check, Plus, AlertCircle, X } from "lucide-react";
import { StickyNote } from "../types";

export default function StickyNotes() {
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");

  // Load notes on mount
  useEffect(() => {
    const saved = localStorage.getItem("securevault_stickynotes");
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch (e) {
        console.error("Could not parse sticky notes", e);
      }
    } else {
      // Seed notes
      const seed: StickyNote[] = [
        {
          id: "1",
          content: "Prepare development reports and slide deck for Wednesday's sprint wrap-up presentation! 📊",
          updatedAt: "2026-06-14 10:20"
        },
        {
          id: "2",
          content: "Remember to thoroughly re-run `tsc --noEmit` and the local linter before pushing code pipelines. 🧪",
          updatedAt: "2026-06-13 14:15"
        },
        {
          id: "3",
          content: "SecureVault password strength utility requires four full criteria modules: capital letter, symbol, numerical digits, length parameters. 🔐",
          updatedAt: "2026-06-14 09:30"
        }
      ];
      setNotes(seed);
      localStorage.setItem("securevault_stickynotes", JSON.stringify(seed));
    }
  }, []);

  const saveNotes = (newNotes: StickyNote[]) => {
    setNotes(newNotes);
    localStorage.setItem("securevault_stickynotes", JSON.stringify(newNotes));
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newNote: StickyNote = {
      id: Math.random().toString(36).substr(2, 9),
      content: content.trim(),
      updatedAt: new Date().toISOString().replace("T", " ").substr(0, 16)
    };

    const updated = [newNote, ...notes];
    saveNotes(updated);
    setContent("");
  };

  const handleDelete = (id: string) => {
    const filtered = notes.filter(n => n.id !== id);
    saveNotes(filtered);
    if (editingId === id) {
      setEditingId(null);
    }
  };

  const handleStartEdit = (note: StickyNote) => {
    setEditingId(note.id);
    setEditingContent(note.content);
  };

  const handleUpdate = (id: string) => {
    if (!editingContent.trim()) return;
    const updated = notes.map(n => {
      if (n.id === id) {
        return {
          ...n,
          content: editingContent.trim(),
          updatedAt: new Date().toISOString().replace("T", " ").substr(0, 16)
        };
      }
      return n;
    });
    saveNotes(updated);
    setEditingId(null);
  };

  return (
    <div className="bg-white dark:bg-[#1c2431] rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
      
      {/* Title block */}
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-yellow-50 dark:bg-yellow-950/40 text-amber-500 rounded-xl">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="font-manrope font-bold text-lg text-gray-900 dark:text-white">Relational CRUD Sticky Board</h2>
            <p className="text-xs text-gray-400 font-sans">Full Create, Read, Update, and Delete actions with yellow realistic physical layout.</p>
          </div>
        </div>
        <div className="text-[10px] bg-yellow-100/70 dark:bg-yellow-950/30 text-amber-600 dark:text-amber-400 px-2.5 py-1 rounded-full uppercase font-semibold font-mono">
          Interactive Lab
        </div>
      </div>

      {/* Input Note Form */}
      <form onSubmit={handleCreate} className="flex gap-2">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a new sticky note task and click Save..."
          className="flex-grow bg-gray-50 dark:bg-[#151c27] border border-gray-250 dark:border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 placeholder-gray-400"
        />
        <button
          type="submit"
          disabled={!content.trim()}
          className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-semibold text-xs uppercase tracking-wider px-5 rounded-xl cursor-pointer transition-all flex items-center gap-1.5 shrink-0"
        >
          <Plus size={16} />
          <span>Save</span>
        </button>
      </form>

      {/* Grid of Yellow Notes */}
      {notes.length === 0 ? (
        <div className="p-12 text-center text-gray-400 rounded-xl border border-dashed border-gray-200 dark:border-gray-700/60 bg-gray-50/50 dark:bg-[#151c27]/30">
          <AlertCircle className="w-8 h-8 mx-auto text-gray-300 mb-2" />
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Sticky note board is empty</h3>
          <p className="text-xs text-gray-500">Add a note using the input box above to trigger SQLite simulation.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {notes.map((note) => {
            const isEditing = editingId === note.id;
            return (
              <div
                key={note.id}
                className="relative bg-gradient-to-br from-yellow-100 to-amber-200 dark:from-yellow-250 dark:to-amber-300 text-gray-900 border border-yellow-200 shadow-[2px_10px_15px_-3px_rgba(245,158,11,0.15)] hover:shadow-[4px_12px_20px_-3px_rgba(245,158,11,0.25)] p-5 rounded-2xl min-h-[170px] flex flex-col justify-between transition-all duration-200 transform hover:-translate-y-1 overflow-hidden"
              >
                {/* Visual Pin Overlay */}
                <div className="absolute left-1/2 top-1.5 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-red-400/80 border border-white/40 shadow-inner"></div>
                
                {isEditing ? (
                  <div className="space-y-3 pt-2">
                    <textarea
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      rows={4}
                      className="w-full text-xs font-medium font-sans bg-white/70 border border-yellow-300 focus:border-amber-500 focus:outline-none rounded-lg p-2 text-gray-900"
                    />
                    <div className="flex justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleUpdate(note.id)}
                        className="p-1.5 rounded-md bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-sm cursor-pointer"
                        title="Save Changes"
                      >
                        <Check size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="p-1.5 rounded-md bg-gray-500 text-white hover:bg-gray-600 transition-colors shadow-sm cursor-pointer"
                        title="Cancel Edit"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-medium font-sans leading-relaxed text-yellow-950 whitespace-pre-wrap break-words">
                      {note.content}
                    </p>
                  </div>
                )}

                {/* Footer and commands */}
                {!isEditing && (
                  <div className="border-t border-yellow-300/60 pt-3 flex items-center justify-between mt-4">
                    <span className="text-[9px] font-mono font-medium text-amber-800">
                      EDITED: {note.updatedAt}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleStartEdit(note)}
                        className="p-1 rounded bg-amber-50 hover:bg-amber-100 text-amber-700 hover:text-amber-900 transition-all cursor-pointer border border-amber-200/40"
                        title="Edit Note"
                      >
                        <Edit2 size={11} />
                      </button>
                      <button
                        onClick={() => handleDelete(note.id)}
                        className="p-1 rounded bg-amber-50 hover:bg-red-500 text-amber-700 hover:text-white transition-all cursor-pointer border border-amber-200/40"
                        title="Delete Note"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
