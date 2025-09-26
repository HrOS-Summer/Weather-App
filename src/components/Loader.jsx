import React from 'react';

const Loader = ({ size = 'md' }) => {
  return (
    <div className="loader flex flex-col items-center justify-center py-6">
      <div className="cloud-row relative w-48 h-20 mb-4" aria-hidden>
        <div className="cloud cloud-lg absolute bg-white/90" style={{ left: '4%', top: '20%' }} />
        <div className="cloud cloud-md absolute bg-white/85" style={{ left: '28%', top: '0%' }} />
        <div className="cloud cloud-sm absolute bg-white/80" style={{ left: '60%', top: '22%' }} />
      </div>

      <div className="loader-text text-white/90 text-sm">Loading weather…</div>
    </div>
  );
};

export default Loader;
