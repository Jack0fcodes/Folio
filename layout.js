document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");

  // Create floating toggle button
  const layoutToggle = document.createElement("div");
  layoutToggle.id = "layoutToggle";
  layoutToggle.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:4px;">
      <span style="width:18px; height:8px; background:#fff; border-radius:2px;"></span>
      <span style="width:18px; height:8px; background:#fff; border-radius:2px;"></span>
    </div>
  `;
  layoutToggle.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    background: rgba(30,30,30,0.8);
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    z-index: 2000;
    transition: background 0.3s;
  `;
  layoutToggle.addEventListener("mouseenter", () => {
    layoutToggle.style.background = "rgba(59,130,246,0.9)"; // hover blue
  });
  layoutToggle.addEventListener("mouseleave", () => {
    layoutToggle.style.background = "rgba(30,30,30,0.8)";
  });

  document.body.appendChild(layoutToggle);

  // Inject CSS for zoomed-out layout
  const style = document.createElement("style");
  style.textContent = `
    /* Zoomed-out layout (about 5 per row) */
    .gallery.zoomed {
      display: grid !important;
      grid-template-columns: repeat(auto-fill, minmax(20%, 1fr)) !important;
      gap: 10px !important;
    }
    .gallery.zoomed img,
    .gallery.zoomed video {
      width: 100% !important;
      margin: 0 !important;
      border-radius: 8px !important;
      display: block !important;
    }
  `;
  document.head.appendChild(style);

  // Toggle zoom
  layoutToggle.addEventListener("click", () => {
    gallery.classList.toggle("zoomed");

    if (gallery.classList.contains("zoomed")) {
      // Change button icon to single line (zoomed)
      layoutToggle.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:4px;">
          <span style="width:18px; height:8px; background:#fff; border-radius:2px;"></span>
        </div>
      `;
    } else {
      // Change back to double line (default)
      layoutToggle.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:4px;">
          <span style="width:18px; height:8px; background:#fff; border-radius:2px;"></span>
          <span style="width:18px; height:8px; background:#fff; border-radius:2px;"></span>
        </div>
      `;
    }
  });
});
