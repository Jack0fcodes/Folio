document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");

  // Create floating toggle button
  const layoutToggle = document.createElement("div");
  layoutToggle.id = "layoutToggle";
  layoutToggle.innerHTML = `
    <div class="toggle-grid default">
      <span class="square"></span>
      <span class="rectangle"></span>
      <span class="rectangle"></span>
      <span class="square"></span>
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
    transition: background 0.3s ease;
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
      transition: transform 0.3s ease;
    }
    .gallery img:hover,
    .gallery video:hover {
      transform: scale(1.02);
    }

    /* Toggle button icons */
    .toggle-grid {
      display: grid;
      gap: 4px;
    }

    /* Default (Grid) icon: 2 squares + 2 vertical rectangles in 2x2 grid */
    .toggle-grid.default {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
    }
    .toggle-grid.default .square {
      width: 10px;
      height: 10px;
      background: #fff;
      border-radius: 2px;
    }
    .toggle-grid.default .rectangle {
      width: 10px;
      height: 18px; /* vertical look */
      background: #fff;
      border-radius: 2px;
    }

    /* Zoom (Column) icon: 3 squares + 3 vertical rectangles stacked */
    .toggle-grid.zoom {
      grid-template-columns: 1fr;
      grid-auto-rows: auto;
    }
    .toggle-grid.zoom .square {
      width: 10px;
      height: 10px;
      background: #fff;
      border-radius: 2px;
    }
    .toggle-grid.zoom .rectangle {
      width: 10px;
      height: 18px; /* vertical still window */
      background: #fff;
      border-radius: 2px;
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

  // Toggle zoom
  layoutToggle.addEventListener("click", () => {
    gallery.classList.toggle("zoomed");

    const grid = layoutToggle.querySelector(".toggle-grid");
    if (gallery.classList.contains("zoomed")) {
      grid.classList.remove("default");
      grid.classList.add("zoom");
    } else {
      grid.classList.remove("zoom");
      grid.classList.add("default");
    }
  });
});
