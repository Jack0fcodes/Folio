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
    layoutToggle.style.background = "rgba(59,130,246,0.9)";
  });
  layoutToggle.addEventListener("mouseleave", () => {
    layoutToggle.style.background = "rgba(30,30,30,0.8)";
  });

  document.body.appendChild(layoutToggle);

  // Inject CSS to control zoom via column-count
  const style = document.createElement("style");
  style.textContent = `
    /* Normal masonry (mobile = fewer columns) */
    .gallery {
      column-count: 1;
      column-gap: 10px;
    }
    @media (min-width: 600px) {
      .gallery { column-count: 2; }
    }
    @media (min-width: 900px) {
      .gallery { column-count: 4; }
    }
    @media (min-width: 1200px) {
      .gallery { column-count: 5; }
    }

    /* Zoomed-out (more columns, even on small screens) */
    .gallery.zoomed {
      column-count: 5 !important;
    }

    .gallery img,
    .gallery video {
      width: 100% !important;
      margin: 0 0 10px !important;
      display: block;
      border-radius: 8px;
    }
  `;
  document.head.appendChild(style);

  // Toggle zoom
  layoutToggle.addEventListener("click", () => {
    gallery.classList.toggle("zoomed");

    if (gallery.classList.contains("zoomed")) {
      // Icon changes to single bar
      layoutToggle.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:4px;">
          <span style="width:18px; height:8px; background:#fff; border-radius:2px;"></span>
        </div>
      `;
    } else {
      // Back to double bar
      layoutToggle.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:4px;">
          <span style="width:18px; height:8px; background:#fff; border-radius:2px;"></span>
          <span style="width:18px; height:8px; background:#fff; border-radius:2px;"></span>
        </div>
      `;
    }
  });
});
