// lock.js
// List of pages to lock
const lockedPages = ["personal.html", "sketch.html"]; 
const password = "1234"; // set your password
let attempts = 0;

// Get current page filename
const currentPage = window.location.pathname.split("/").pop();

if (lockedPages.includes(currentPage)) {
    // Create lock overlay
    const lockOverlay = document.createElement("div");
    lockOverlay.id = "lock-overlay";
    lockOverlay.style.cssText = `
        position: fixed;
        top:0; left:0;
        width:100%; height:100%;
        background: rgba(0,0,0,0.9);
        display:flex;
        flex-direction: column;
        justify-content:center;
        align-items:center;
        color:white;
        font-size:2rem;
        z-index:9999;
    `;
    lockOverlay.innerHTML = `
        <span style="font-size:4rem;">🔒</span>
        <p>Enter password to access</p>
        <input type="password" id="password-input" placeholder="Password" style="padding:0.5rem; font-size:1rem;">
        <button id="password-btn" style="padding:0.5rem 1rem; font-size:1rem; margin-top:1rem;">Unlock</button>
        <p id="error-msg" style="color:red; margin-top:0.5rem; display:none;">Incorrect password</p>
    `;
    document.body.appendChild(lockOverlay);

    const input = document.getElementById("password-input");
    const btn = document.getElementById("password-btn");
    const errorMsg = document.getElementById("error-msg");

    btn.addEventListener("click", () => {
        if(input.value === password){
            lockOverlay.style.display = "none";
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
