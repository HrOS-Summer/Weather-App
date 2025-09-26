import React from 'react';

const SearchBar = ({ city, setCity, onSearch }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        placeholder="Enter city name"
        className="flex-1 px-4 py-3 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:border-white/60"
      />
      <button
        onClick={onSearch}
        className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-full font-semibold transition-all duration-200 backdrop-blur-sm cursor-pointer"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
