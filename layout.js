document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");

  // Create floating toggle button
  const layoutToggle = document.createElement("div");
  layoutToggle.id = "layoutToggle";
  layoutToggle.innerHTML = `
    <div style="
      display: flex;
      flex-direction: column;
      gap: 4px;
    ">
      <span style="width: 18px; height: 8px; background:#fff; border-radius:2px;"></span>
      <span style="width: 18px; height: 8px; background:#fff; border-radius:2px;"></span>
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
    layoutToggle.style.background = "rgba(59,130,246,0.9)"; // blue hover
  });
  layoutToggle.addEventListener("mouseleave", () => {
    layoutToggle.style.background = "rgba(30,30,30,0.8)";
  });

  document.body.appendChild(layoutToggle);

  // Inject styles for row layout
  const style = document.createElement("style");
  style.textContent = `
    .gallery.row-layout {
      column-count: 1 !important;
      display: block !important;
    }
    .gallery.row-layout img,
    .gallery.row-layout video {
      width: 100% !important;
      margin: 10px 0 !important;
      border-radius: 8px !important;
      display: block !important;
    }
  `;
  document.head.appendChild(style);

  // Toggle
  layoutToggle.addEventListener("click", () => {
    gallery.classList.toggle("row-layout");

    // Update button icon between 2 lines (rows) and stacked (masonry)
    if (gallery.classList.contains("row-layout")) {
      layoutToggle.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <span style="width: 18px; height: 8px; background:#fff; border-radius:2px;"></span>
        </div>
      `;
    } else {
      layoutToggle.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <span style="width: 18px; height: 8px; background:#fff; border-radius:2px;"></span>
          <span style="width: 18px; height: 8px; background:#fff; border-radius:2px;"></span>
        </div>
      `;
    }
  });
});
