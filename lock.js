// lock.js
const lockedPages = ["personal.html", "sketch.html"]; 
const password = "1234";
let attempts = 0;

const currentPage = window.location.pathname.split("/").pop();

if (lockedPages.includes(currentPage)) {
    // Solid black overlay
    const overlay = document.createElement("div");
    overlay.id = "lock-overlay";
    overlay.style.cssText = `
        position: fixed;
        top:0; left:0;
        width:100%; height:100%;
        background: #000; /* solid black */
        display:flex;
        justify-content:center;
        align-items:center;
        flex-direction:column;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        color:#fff;
        z-index:9999;
    `;

    overlay.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; gap:1.5rem;">
            <!-- Circle outline with filled lock -->
            <div style="
                width:90px; height:90px;
                border:3px solid white;   /* thicker outline */
                border-radius:50%;
                display:flex;
                justify-content:center;
                align-items:center;
            ">
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="white" viewBox="0 0 24 24">
                    <path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                    <path fill-rule="evenodd" d="M6 9V7a6 6 0 1 1 12 0v2h1a1 1 0 0 1 1 1v11a1 
                    1 0 0 1-1 1H5a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1h1zm2-2a4 4 0 0 1 8 0v2H8V7z" clip-rule="evenodd"/>
                </svg>
            </div>

            <!-- Input + arrow button -->
            <div style="display:flex; align-items:center; gap:0.5rem;">
                <input type="password" id="password-input" placeholder="Password" style="
                    padding:0.6rem 1rem;
                    font-size:1rem;
                    border-radius:20px;
                    border:none;
                    outline:none;
                    text-align:center;
                    width:180px;
                ">
                <button id="password-btn" style="
                    background:white;
                    border:none;
                    border-radius:50%;
                    width:42px;
                    height:42px;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    cursor:pointer;
                ">
                    <!-- Arrow pointing right -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" viewBox="0 0 24 24">
                        <path d="M10 17l5-5-5-5v10z"/>
                    </svg>
                </button>
            </div>

            <p id="error-msg" style="color:#ff4d4f; margin-top:0.5rem; display:none; font-size:0.9rem;">Incorrect password</p>
        </div>
    `;

    document.body.appendChild(overlay);

    const input = document.getElementById("password-input");
    const btn = document.getElementById("password-btn");
    const errorMsg = document.getElementById("error-msg");

    btn.addEventListener("click", () => {
        if(input.value === password){
            overlay.style.opacity = "0";
            overlay.style.transition = "opacity 0.4s ease";
            setTimeout(() => overlay.remove(), 400);
        } else {
            attempts++;
            errorMsg.style.display = "block";
            if(attempts >= 3){
                alert("Access denied. Redirecting to home page.");
                window.location.href = "index.html";
            }
        }
    });

    input.addEventListener("keypress", (e) => {
        if(e.key === "Enter") btn.click();
    });
}
