document.addEventListener("DOMContentLoaded", () => {
  const lockedPages = ["personal.html", "sketch.html"]; // pages to lock
  const currentPage = window.location.pathname.split("/").pop();

  if (lockedPages.includes(currentPage)) {
    const overlay = document.createElement("div");
    overlay.id = "lock-overlay";
    overlay.innerHTML = `
      <div class="lock-container">
        <div class="lock-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="black" stroke-width="2.5" fill="none"/>
            <path d="M12 17a2 2 0 002-2v-2a2 2 0 00-4 0v2a2 2 0 002 2z" fill="black"/>
            <rect x="9" y="10" width="6" height="5" rx="1" fill="black"/>
          </svg>
        </div>
        <input type="password" id="password-input" placeholder="Password">
        <button id="password-btn">
          <!-- ✅ your original arrow -->
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" viewBox="0 0 24 24">
            <path d="M12 4l1.41 1.41L8.83 10H20v2H8.83l4.58 4.59L12 18l-8-8 8-8z" transform="rotate(180, 12, 12)"/>
          </svg>
        </button>
        <p id="error-msg">Incorrect password</p>
      </div>
    `;
    document.body.appendChild(overlay);

    const style = document.createElement("style");
    style.textContent = `
      #lock-overlay {
        position: fixed;
        inset: 0;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
      }
      .lock-container {
        text-align: center;
        font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
      }
      .lock-icon {
        margin-bottom: 20px;
      }
      #password-input {
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ddd;
        border-radius: 8px;
        outline: none;
        margin-right: 10px;
      }
      #password-btn {
        background: none;
        border: none;
        cursor: pointer;
        vertical-align: middle;
      }
      #error-msg {
        color: red;
        font-size: 14px;
        margin-top: 12px;
        opacity: 0;
        transition: opacity 0.4s ease;
      }
      #error-msg.visible {
        opacity: 1;
      }
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-6px); }
        40%, 80% { transform: translateX(6px); }
      }
      .shake {
        animation: shake 0.3s;
      }
    `;
    document.head.appendChild(style);

    const input = document.getElementById("password-input");
    const btn = document.getElementById("password-btn");
    const errorMsg = document.getElementById("error-msg");

    function unlock() {
      if (input.value === "1234") {
        overlay.style.display = "none";
      } else {
        input.classList.add("shake");
        errorMsg.classList.add("visible"); // fade in
        setTimeout(() => {
          input.classList.remove("shake");
          errorMsg.classList.remove("visible"); // fade out
        }, 1500);
      }
    }

    btn.addEventListener("click", unlock);
    input.addEventListener("keypress", e => {
      if (e.key === "Enter") unlock();
    });
  }
});
