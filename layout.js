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
            {/* Top row */}
            <rect x="2" y="3" width="4" height="5" rx="1.5" />
            <rect x="8" y="3" width="4" height="7" rx="1.5" />
            <rect x="14" y="3" width="6" height="5" rx="1.5" />
            {/* Bottom row */}
            <rect x="2" y="12" width="4" height="6" rx="1.5" />
            <rect x="8" y="12" width="4" height="5" rx="1.5" />
            <rect x="14" y="12" width="6" height="7" rx="1.5" />
          </svg>
        ) : (
          // 2 column icon (default)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            {/* Top row */}
            <rect x="3" y="3" width="7" height="5" rx="1.5" />
            <rect x="13" y="3" width="8" height="7" rx="1.5" />
            {/* Bottom row */}
            <rect x="3" y="12" width="7" height="7" rx="1.5" />
            <rect x="13" y="12" width="8" height="5" rx="1.5" />
          </svg>
        )}
      </button>
    </div>
  );
}
