import React, { useState } from "react";

export default function LayoutToggle() {
  const [zoomOut, setZoomOut] = useState(false);

  return (
    <div className="p-4">
      <button
        onClick={() => setZoomOut(!zoomOut)}
        className="p-2 bg-black text-white rounded-xl"
      >
        {zoomOut ? (
          // 3 column icon (zoomed out)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            {/* 3 varied rectangles */}
            <rect x="2" y="4" width="4" height="14" rx="1.5" />
            <rect x="9" y="6" width="4" height="10" rx="1.5" />
            <rect x="16" y="3" width="6" height="18" rx="1.5" />
          </svg>
        ) : (
          // 2 column icon (default)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            {/* Left shorter, right taller */}
            <rect x="3" y="7" width="7" height="10" rx="1.5" />
            <rect x="13" y="3" width="8" height="16" rx="1.5" />
          </svg>
        )}
      </button>
    </div>
  );
}
