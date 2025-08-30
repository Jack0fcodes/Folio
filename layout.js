document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");

  // Create floating toggle button
  const layoutToggle = document.createElement("div");
  layoutToggle.id = "layoutToggle";
  layoutToggle.innerHTML = `
    <div class="toggle-grid">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;
  layoutToggle.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    width: 24px;                 /* fixed button size */
    height: 24px;                /* fixed button size */
    background: rgba(30,30,30,0.8);
    padding: 0;                  /* keep outer size fixed */
    box-sizing: border-box;
    border-radius: 6px;
    cursor: pointer;
    z-index: 2000;
    transition: background 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;     /* center the grid inside the button */
  `;
  document.body.appendChild(layoutToggle);

  // Inject CSS for gallery + toggle button
  const style = document.createElement("style");
  style.textContent = `
    /* Normal masonry (mobile first) */
    .gallery {
      column-count: 1;
      column-gap: 10px;
      transition: column-count 0.3s ease;
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

    /* Zoomed-out view */
    .gallery.zoomed {
      column-count: 6 !important;
    }

    .gallery img,
    .gallery video {
      width: 100% !important;
      margin: 0 0 10px !important;
      display: block;
      border-radius: 8px;
      transition: transform 0.3s ease; /* kept exactly as you asked */
    }
    .gallery img:hover,
    .gallery video:hover {
      transform: scale(1.02);
    }

    /* Toggle button grid icon (shrink-to-content and centered) */
    .toggle-grid {
      display: grid;
      place-items: center;               /* center items inside the grid */
      grid-template-columns: repeat(2, auto);
      grid-template-rows: repeat(2, auto);
      gap: 3px;
      /* no width/height here — let it shrink to content so the parent flex centers it */
    }
    .toggle-grid span {
      width: 8px;           /* kept your original size */
      height: 8px;          /* kept your original size */
      background: #fff;
      border-radius: 2px;
      transition: all 0.3s ease; /* kept as-is */
      opacity: 1;
      transform: scale(1);
      display: block;
    }

    /* Hide extra 2 spans initially (they will fade+scale in) */
    .toggle-grid span:nth-child(n+5) {
      opacity: 0;
      transform: scale(0);
      pointer-events: none;
    }

    /* Six-square mode (3x2) - shows all 6 squares */
    .toggle-grid.six {
      grid-template-columns: repeat(3, auto);
      grid-template-rows: repeat(2, auto);
    }
    .toggle-grid.six span {
      opacity: 1;
      transform: scale(1);
      pointer-events: auto;
    }
  `;
  document.head.appendChild(style);

  // Hover effect
  layoutToggle.addEventListener("mouseenter", () => {
    layoutToggle.style.background = "rgba(59,130,246,0.9)";
  });
  layoutToggle.addEventListener("mouseleave", () => {
    layoutToggle.style.background = "rgba(30,30,30,0.8)";
  });

  // Toggle zoom (function logic kept intact — only toggling the grid class to .six)
  layoutToggle.addEventListener("click", () => {
    gallery.classList.toggle("zoomed");

    const grid = layoutToggle.querySelector(".toggle-grid");
    if (gallery.classList.contains("zoomed")) {
      grid.classList.add("six");   // show 6 squares (animated)
    } else {
      grid.classList.remove("six"); // back to 4 squares (animated)
    }
  });
});
