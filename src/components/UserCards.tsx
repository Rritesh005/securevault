import React, { useState, useEffect } from "react";
import { UserCheck, RefreshCw, Mail, Globe, MapPin, Building, AlertCircle } from "lucide-react";
import { UserCard } from "../types";

export default function UserCards() {
  const [users, setUsers] = useState<UserCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setErrorText("");
    try {
      // Fetch users from JSONPlaceholder
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) throw new Error("API responded with an error");
      const data = await res.json();
      
      // Map to UserCard structure with beautiful stable Unsplash avatar shortcuts
      const avs = [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300"
      ];

      const mappedUsers = data.slice(0, 8).map((u: any, idx: number) => ({
        id: u.id.toString(),
        name: u.name,
        email: u.email.toLowerCase(),
        picture: avs[idx % avs.length],
        username: u.username,
        website: u.website,
        company: u.company?.name || "Global Tech Inc.",
        city: u.address?.city || "New Delhi"
      }));

      setUsers(mappedUsers);
    } catch (e: any) {
      console.warn("REST fetch error, using local seed dataset:", e.message);
      // Fallback local robust dataset
      const seeds: UserCard[] = [
        {
          id: "1",
          name: "Leanne Graham",
          email: "sincere@april.biz",
          picture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
          username: "Bret"
        },
        {
          id: "2",
          name: "Ervin Howell",
          email: "shanna@melissa.tv",
          picture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
          username: "Antonette"
        },
        {
          id: "3",
          name: "Clementine Bauch",
          email: "nathan@yesenia.net",
          picture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300",
          username: "Samantha"
        },
        {
          id: "4",
          name: "Patricia Lebsack",
          email: "julianne.oconner@kory.org",
          picture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
          username: "Karianne"
        },
        {
          id: "5",
          name: "Chelsey Dietrich",
          email: "lucio_hettinger@annie.ca",
          picture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300",
          username: "Kamren"
        },
        {
          id: "6",
          name: "Mrs. Dennis Schulist",
          email: "karley_dach@jasper.info",
          picture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300",
          username: "Leopoldo_Corkery"
        }
      ];
      setUsers(seeds);
      setErrorText("CORS/Connection limit triggered. Displaying local resilient fallback card profiles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-white dark:bg-[#1c2431] rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-purple-50 dark:bg-purple-950/40 text-purple-500 rounded-xl">
            <UserCheck className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="font-manrope font-bold text-lg text-gray-900 dark:text-white">Social Registry Ingest</h2>
            <p className="text-xs text-gray-400 font-sans">Triggering async fetch promises pointing to external placeholder networks.</p>
          </div>
        </div>

        <button
          onClick={fetchUsers}
          disabled={loading}
          className="bg-[#00236f] hover:bg-[#001c59] text-white px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 transition-colors"
        >
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          <span>Reload Profiles</span>
        </button>
      </div>

      {errorText && (
        <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 text-xs font-semibold border border-amber-200/40 flex items-center gap-2">
          <AlertCircle size={14} className="shrink-0" />
          <span>{errorText}</span>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-2 text-gray-400">
          <RefreshCw size={24} className="animate-spin text-[#00236f] dark:text-[#b6c4ff]" />
          <p className="text-xs font-semibold">Deserializing API payloads...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-gray-50/50 dark:bg-[#151c27]/40 border border-gray-150 dark:border-gray-850 rounded-2xl overflow-hidden hover:border-purple-500/20 dark:hover:border-purple-500/30 hover:shadow-md transition-all duration-300 flex flex-col text-center"
            >
              {/* Graphic card head */}
              <div className="h-14 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 relative"></div>
              
              <div className="px-5 pb-5 -mt-8 flex-grow flex flex-col items-center justify-between gap-4">
                <div className="space-y-3 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full border-4 border-white dark:border-[#1c2431] overflow-hidden bg-white shadow-sm relative">
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="font-manrope font-bold text-sm text-gray-900 dark:text-white leading-tight">
                      {user.name}
                    </h3>
                    <p className="text-[10px] font-mono text-gray-400 dark:text-gray-505">
                      @{user.username}
                    </p>
                  </div>
                </div>

                <div className="w-full border-t border-gray-150 dark:border-gray-850/60 pt-3 space-y-2 text-[11px] text-gray-505 dark:text-gray-400 text-left">
                  <div className="flex items-center gap-2">
                    <Mail size={12} className="text-gray-400 shrink-0" />
                    <span className="truncate font-mono">{user.email}</span>
                  </div>
                  
                  {/* Optional UI additions if we pulled rich company tags */}
                  {(user as any).company && (
                    <div className="flex items-center gap-2">
                      <Building size={12} className="text-gray-400 shrink-0" />
                      <span className="truncate font-sans font-medium">{(user as any).company}</span>
                    </div>
                  )}

                  {(user as any).city && (
                    <div className="flex items-center gap-2">
                      <MapPin size={12} className="text-gray-400 shrink-0" />
                      <span className="truncate font-sans">{(user as any).city}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
