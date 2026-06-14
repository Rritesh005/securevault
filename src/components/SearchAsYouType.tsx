import React, { useState } from "react";
import { Search, Film, Star, Command, ArrowRight, CornerDownRight } from "lucide-react";

interface MovieItem {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  director: string;
}

export default function SearchAsYouType() {
  const [query, setQuery] = useState("");

  const movies: MovieItem[] = [
    { id: "1", title: "Interstellar", genre: "Sci-Fi, Adventure, Drama", year: 2014, rating: 8.7, director: "Christopher Nolan" },
    { id: "2", title: "Inception", genre: "Action, Sci-Fi, Adventure", year: 2010, rating: 8.8, director: "Christopher Nolan" },
    { id: "3", title: "The Dark Knight", genre: "Action, Crime, Drama", year: 2008, rating: 9.0, director: "Christopher Nolan" },
    { id: "4", title: "Pulp Fiction", genre: "Crime, Drama", year: 1994, rating: 8.9, director: "Quentin Tarantino" },
    { id: "5", title: "Spirited Away", genre: "Fantasy, Animation, Family", year: 2001, rating: 8.6, director: "Hayao Miyazaki" },
    { id: "6", title: "Whiplash", genre: "Drama, Music", year: 2014, rating: 8.5, director: "Damien Chazelle" },
    { id: "7", title: "The Matrix", genre: "Sci-Fi, Action", year: 1999, rating: 8.7, director: "Lana Wachowski" },
    { id: "8", title: "Parasite", genre: "Thriller, Drama, Comedy", year: 2019, rating: 8.5, director: "Bong Joon Ho" },
    { id: "9", title: "Gladiator", genre: "Action, Adventure, Drama", year: 2000, rating: 8.5, director: "Ridley Scott" },
    { id: "10", title: "The Shawshank Redemption", genre: "Drama", year: 1994, rating: 9.3, director: "Frank Darabont" },
    { id: "11", title: "Blade Runner 2049", genre: "Sci-Fi, Drama, Mystery", year: 2017, rating: 8.0, director: "Denis Villeneuve" },
    { id: "12", title: "Inglourious Basterds", genre: "Adventure, Drama, War", year: 2009, rating: 8.4, director: "Quentin Tarantino" }
  ];

  // Dynamic filter engine matching query
  const filteredMovies = movies.filter((movie) => {
    const term = query.toLowerCase();
    return (
      movie.title.toLowerCase().includes(term) ||
      movie.genre.toLowerCase().includes(term) ||
      movie.director.toLowerCase().includes(term)
    );
  });

  return (
    <div className="bg-white dark:bg-[#1c2431] rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
      
      {/* Title */}
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-teal-50 dark:bg-teal-950/40 text-teal-500 rounded-xl">
            <Film className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="font-manrope font-bold text-lg text-gray-900 dark:text-white">Dynamic Real-Time filter</h2>
            <p className="text-xs text-gray-400 font-sans">Reactive array filtering with strict string substring checks.</p>
          </div>
        </div>
        <span className="text-[10px] font-semibold text-teal-600 dark:text-teal-400 uppercase bg-teal-50 dark:bg-teal-950/30 px-2.5 py-1 rounded-full font-mono">
          Array.filter()
        </span>
      </div>

      {/* Advanced search selector */}
      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, genre, or director..."
          className="w-full bg-gray-50 dark:bg-[#151c27] border border-gray-250 dark:border-gray-800 rounded-xl pl-12 pr-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-sans"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 text-[10px] text-gray-400 font-mono bg-white dark:bg-[#1c2431] border border-gray-200 dark:border-gray-700 px-2 py-0.5 rounded-md">
          <Command size={10} />
          <span>F</span>
        </div>
      </div>

      {/* Quick Search Badges */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-gray-400 font-medium font-sans">Quick search:</span>
        {["Nolan", "Sci-Fi", "Tarantino", "Drama"].map((keyword) => (
          <button
            key={keyword}
            onClick={() => setQuery(keyword)}
            className="px-2.5 py-1 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-750 text-gray-600 dark:text-gray-300 border border-gray-150 dark:border-gray-850 rounded-lg transition-colors cursor-pointer"
          >
            {keyword}
          </button>
        ))}
        {query && (
          <button
            onClick={() => setQuery("")}
            className="text-red-500 hover:underline font-semibold"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Search results matching state array */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs font-mono text-gray-400 dark:text-gray-505 px-1 py-0.5">
          <span>MATCHING_RECORDS_COUNT</span>
          <span>{filteredMovies.length} of {movies.length} rows loaded</span>
        </div>

        {filteredMovies.length === 0 ? (
          <div className="text-center p-12 rounded-xl border border-dashed border-gray-200 dark:border-gray-800 text-gray-400">
            <Film className="w-10 h-10 mx-auto text-gray-300 mb-2" />
            <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300">No matching movies found</h4>
            <p className="text-xs">Adjust query words to test the custom reactive filtering pipeline.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="p-4 bg-[#f9f9ff] dark:bg-[#151c27] border border-gray-150 dark:border-gray-850 rounded-xl space-y-3 shadow-2xs hover:border-teal-500/25 dark:hover:border-teal-500/30 transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-manrope font-extrabold text-sm text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {movie.title}
                    </h3>
                    <p className="text-[10px] bg-white dark:bg-[#1c2431] border border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-450 px-2.5 py-0.5 rounded-full w-fit">
                      {movie.genre}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-amber-500">
                    <Star size={13} className="fill-amber-400 text-amber-400" />
                    <span>{movie.rating}</span>
                  </div>
                </div>

                <div className="border-t border-gray-150 dark:border-gray-850/60 pt-3 text-xs flex items-center justify-between font-sans text-gray-500">
                  <span className="flex items-center gap-1 font-medium italic">
                    <CornerDownRight size={12} className="text-gray-450" />
                    <span>Dir: {movie.director}</span>
                  </span>
                  <span className="font-mono text-[10px] text-gray-400">{movie.year}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
