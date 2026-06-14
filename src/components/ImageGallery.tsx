import React, { useState, useEffect, useRef } from "react";
import { FolderHeart, Image as ImageIcon, Plus, Trash2, Camera, Upload, CheckCircle, Info } from "lucide-react";
import { GalleryItem } from "../types";

export default function ImageGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [errorStatus, setErrorStatus] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load photos on mount
  useEffect(() => {
    const saved = localStorage.getItem("securevault_gallery");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Could not parse gallery", e);
      }
    } else {
      // Seed stunning placeholder cards for initial renders
      const seed: GalleryItem[] = [
        {
          id: "1",
          title: "Sleek Workspace Configuration",
          imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=600",
          uploadedAt: "2026-06-14 10:15"
        },
        {
          id: "2",
          title: "Minimalist Server Architecture",
          imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600",
          uploadedAt: "2026-06-13 14:30"
        }
      ];
      setItems(seed);
      localStorage.setItem("securevault_gallery", JSON.stringify(seed));
    }
  }, []);

  const saveGallery = (newItems: GalleryItem[]) => {
    setItems(newItems);
    localStorage.setItem("securevault_gallery", JSON.stringify(newItems));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setErrorStatus("File exceeds 2MB limit. Please choose a smaller asset.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageFile(reader.result as string);
      setErrorStatus("");
    };
    reader.readAsDataURL(file);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageFile) return;

    const newItem: GalleryItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: title.trim(),
      imageUrl: imageFile,
      uploadedAt: new Date().toISOString().replace("T", " ").substr(0, 16)
    };

    const updated = [newItem, ...items];
    saveGallery(updated);

    // Reset fields
    setTitle("");
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDelete = (id: string) => {
    const filtered = items.filter(x => x.id !== id);
    saveGallery(filtered);
  };

  const handleApplySamplePreset = (url: string, name: string) => {
    setImageFile(url);
    setTitle(name);
  };

  return (
    <div className="bg-white dark:bg-[#1c2431] rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
      
      {/* Title */}
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-pink-50 dark:bg-pink-950/40 text-pink-500 rounded-xl">
            <FolderHeart className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-manrope font-bold text-lg text-gray-900 dark:text-white">Secure Ingest Image Vault</h2>
            <p className="text-xs text-gray-400">Uploading and rendering local file blobs inside responsive CSS grid blocks.</p>
          </div>
        </div>
        <div className="text-[10px] bg-pink-50 dark:bg-pink-950/30 text-pink-600 dark:text-pink-400 px-2.5 py-1 rounded-full uppercase font-semibold font-mono">
          Filesystem Ingest
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Upload panel column */}
        <div className="md:col-span-1 bg-gray-50/50 dark:bg-[#151c27]/30 border border-gray-150 dark:border-gray-800 p-5 rounded-2xl space-y-4 h-fit">
          <h3 className="font-manrope text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
            <Camera size={16} className="text-slate-500" />
            <span>Upload New Asset</span>
          </h3>

          {errorStatus && (
            <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs font-semibold border border-red-200/40">
              {errorStatus}
            </div>
          )}

          <form onSubmit={handleUploadSubmit} className="space-y-4">
            
            {/* Image Picker */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Image source</span>
              
              {imageFile ? (
                <div className="relative rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden aspect-video bg-black/5">
                  <img src={imageFile} alt="Upload Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <button
                    type="button"
                    onClick={() => setImageFile(null)}
                    className="absolute top-2 right-2 p-1 rounded-md bg-black/60 text-white hover:bg-black/80 transition-colors text-xs"
                  >
                    Clear
                  </button>
                </div>
              ) : (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl p-6 text-center hover:bg-gray-100/40 dark:hover:bg-gray-900/30 transition-all cursor-pointer space-y-2 group"
                >
                  <Upload size={24} className="mx-auto text-gray-400 group-hover:text-[#0058be] transition-colors" />
                  <div>
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Choose Image File</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Supports PNG, JPG (Max 2MB)</p>
                  </div>
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Title field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide" htmlFor="gallery-title">Asset Title</label>
              <input
                id="gallery-title"
                type="text"
                required
                placeholder="Give your picture an elegant title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white dark:bg-[#151c27] border border-gray-200 dark:border-gray-850 rounded-lg px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>

            <button
              type="submit"
              disabled={!title.trim() || !imageFile}
              className="w-full bg-[#00236f] hover:bg-[#001c59] text-white disabled:opacity-50 text-xs font-semibold uppercase tracking-wider py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-md shadow-indigo-950/10 cursor-pointer"
            >
              <CheckCircle size={14} />
              <span>Simulate Upload & Save</span>
            </button>
          </form>

          {/* Quick Mock Presets for Low friction testing */}
          <div className="border-t border-gray-200/50 dark:border-gray-800/80 pt-4 space-y-2">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <Info size={11} />
              <span>Demomode Presets</span>
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[
                { name: "Urban Tech Space", url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=600" },
                { name: "Abstract Geometry", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600" }
              ].map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handleApplySamplePreset(preset.url, preset.name)}
                  className="text-[10px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-2 py-1 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Masonry Canvas Gallery Column */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between bg-gray-50 dark:bg-[#151c27] px-4 py-2.5 rounded-xl border border-gray-100 dark:border-gray-800 text-xs font-mono text-gray-500">
            <span>GRID_CANVAS: ACTIVE</span>
            <span>Total stored files: {items.length}</span>
          </div>

          {items.length === 0 ? (
            <div className="p-12 text-center text-gray-400 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
              <ImageIcon className="w-10 h-10 mx-auto text-gray-300" />
              <h4 className="font-semibold text-sm mt-2 text-gray-700 dark:text-gray-300">Gallery remains empty</h4>
              <p className="text-xs">Provide a local upload or select presets on the left side menu.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white dark:bg-[#1c2431] border border-gray-150 dark:border-gray-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
                >
                  <div className="aspect-video w-full bg-slate-100 dark:bg-slate-900 relative overflow-hidden shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-[10px] font-semibold text-white/90 bg-black/30 backdrop-blur px-2 py-0.5 rounded-full uppercase font-mono tracking-wider">
                        Stored locally
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex-grow flex flex-col justify-between gap-3">
                    <div className="space-y-1">
                      <h4 className="font-semibold text-xs text-gray-400 font-mono">FILE_ROW_ID: {item.id}</h4>
                      <h3 className="font-manrope font-bold text-sm text-gray-900 dark:text-white leading-snug">{item.title}</h3>
                    </div>

                    <div className="border-t border-gray-100 dark:border-gray-800/60 pt-3 flex items-center justify-between text-[11px] text-gray-400">
                      <span>Uploaded {item.uploadedAt}</span>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer"
                        title="Delete Media Record"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
