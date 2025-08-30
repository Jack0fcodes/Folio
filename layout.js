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

    /* Toggle button grid icon default (4 squares) */
    .toggle-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      gap: 4px;
      width: 24px;
      height: 24px;
    }
    .toggle-grid span {
      width: 100%;
      height: 100%;
      background: #fff;
      border-radius: 2px;
      transition: all 0.3s ease;
    }
    /* Hide extra 2 spans by default */
    .toggle-grid span:nth-child(n+5) {
      opacity: 0;
      transform: scale(0);
    }

    /* Six-square mode (when zoomed) */
    .toggle-grid.six {
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);
    }
    .toggle-grid.six span {
      opacity: 1;
      transform: scale(1);
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

  // Toggle zoom (same logic, just swap class name)
  layoutToggle.addEventListener("click", () => {
    gallery.classList.toggle("zoomed");

    const grid = layoutToggle.querySelector(".toggle-grid");
    if (gallery.classList.contains("zoomed")) {
      grid.classList.add("six");   // 6 squares
    } else {
      grid.classList.remove("six"); // back to 4 squares
    }
  });
});
