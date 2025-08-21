// lock.js
const lockedPages = ["personal.html", "sketch.html"]; 
const password = "1234";
let attempts = 0;

const currentPage = window.location.pathname.split("/").pop();

if (lockedPages.includes(currentPage)) {
    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "lock-overlay";
    overlay.style.cssText = `
        position: fixed;
        top:0; left:0;
        width:100%; height:100%;
        background: rgba(0,0,0,0.85);
        display:flex;
        justify-content:center;
        align-items:center;
        flex-direction:column;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        color:#fff;
        z-index:9999;
    `;

    overlay.innerHTML = `
        <div style="
            background: rgba(255,255,255,0.1);
            padding: 2rem 3rem;
            border-radius: 16px;
            display:flex;
            flex-direction:column;
            align-items:center;
            box-shadow: 0 4px 30px rgba(0,0,0,0.3);
            backdrop-filter: blur(10px);
        ">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="feather feather-lock" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0110 0v4"></path>
            </svg>
            <h2 style="margin:1rem 0 0.5rem 0; font-weight:400;">Enter Password</h2>
            <input type="password" id="password-input" placeholder="Password" style="
                padding:0.5rem 1rem;
                font-size:1rem;
                border-radius:8px;
                border:none;
                margin-top:0.5rem;
                text-align:center;
                width:180px;
            ">
            <button id="password-btn" style="
                margin-top:1rem;
                padding:0.5rem 1rem;
                font-size:1rem;
                border-radius:8px;
                border:none;
                background:white;
                color:black;
                cursor:pointer;
                width:100px;
            ">Unlock</button>
            <p id="error-msg" style="color:#ff4d4f; margin-top:0.5rem; display:none; font-size:0.9rem;">Incorrect password</p>
        </div>
    `;

    document.body.appendChild(overlay);

    const input = document.getElementById("password-input");
    const btn = document.getElementById("password-btn");
    const errorMsg = document.getElementById("error-msg");

    btn.addEventListener("click", () => {
        if(input.value === password){
            overlay.style.display = "none";
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
