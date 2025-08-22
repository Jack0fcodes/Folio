// lock.js
const lockedPages = ["personal.html", "sketch.html"]; 
const password = "1234";
let attempts = 0;

const currentPage = window.location.pathname.split("/").pop();

if (lockedPages.includes(currentPage)) {
    const overlay = document.createElement("div");
    overlay.id = "lock-overlay";
    overlay.style.cssText = `
        position: fixed;
        top:0; left:0;
        width:100%; height:100%;
        background: #000;
        display:flex;
        justify-content:center;
        align-items:center;
        flex-direction:column;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        color:#fff;
        z-index:9999;
        opacity:0;
        animation: fadeIn 0.6s ease forwards;
    `;

    overlay.innerHTML = `
        <style>
            @keyframes fadeIn {
                from { opacity:0; }
                to { opacity:1; }
            }
            @keyframes slideUp {
                from { transform: translateY(40px); opacity:0; }
                to { transform: translateY(0); opacity:1; }
            }
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                20%, 60% { transform: translateX(-10px); }
                40%, 80% { transform: translateX(10px); }
            }
            #lock-container {
                display:flex;
                flex-direction:column;
                align-items:center;
                gap:1.5rem;
                animation: slideUp 0.7s ease forwards;
            }
            #lock-circle {
                width:90px; height:90px;
                border:3px solid white;
                border-radius:50%;
                display:flex;
                justify-content:center;
                align-items:center;
                animation: slideUp 0.7s ease 0.1s forwards;
                opacity:0;
            }
            #lock-input-container {
                display:flex;
                align-items:center;
                gap:0.5rem;
                animation: slideUp 0.7s ease 0.2s forwards;
                opacity:0;
            }
            #password-input {
                padding:0.6rem 1rem;
                font-size:1rem;
                border-radius:20px;
                border:none;
                outline:none;
                text-align:center;
                width:180px;
            }
            #password-btn {
                background:white;
                border:none;
                border-radius:50%;
                width:42px;
                height:42px;
                display:flex;
                justify-content:center;
                align-items:center;
                cursor:pointer;
                transition: transform 0.2s ease;
            }
            #password-btn:hover {
                transform: scale(1.1);
            }
            #error-msg {
                color:#ff4d4f;
                margin-top:0.5rem;
                display:none;
                font-size:0.9rem;
            }
            .shake {
                animation: shake 0.4s;
            }
        </style>

        <div id="lock-container">
            <!-- Circle outline with filled lock -->
            <div id="lock-circle">
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="white" viewBox="0 0 24 24">
                    <path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                    <path fill-rule="evenodd" d="M6 9V7a6 6 0 1 1 12 0v2h1a1 1 0 0 1 1 1v11a1 
                    1 0 0 1-1 1H5a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1h1zm2-2a4 4 0 0 1 8 0v2H8V7z" clip-rule="evenodd"/>
                </svg>
            </div>

            <!-- Input + arrow button -->
            <div id="lock-input-container">
                <input type="password" id="password-input" placeholder="Password">
                <button id="password-btn">
                    <!-- Arrow pointing right -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" viewBox="0 0 24 24">
                        <path d="M8 5l8 7-8 7V5z"/>
                    </svg>
                </button>
            </div>

            <p id="error-msg">Incorrect password</p>
        </div>
    `;

    document.body.appendChild(overlay);

    const input = document.getElementById("password-input");
    const btn = document.getElementById("password-btn");
    const errorMsg = document.getElementById("error-msg");
    const inputContainer = document.getElementById("lock-input-container");

    function wrongPasswordEffect() {
        errorMsg.style.display = "block";
        inputContainer.classList.add("shake");
        setTimeout(() => inputContainer.classList.remove("shake"), 400);
    }

    btn.addEventListener("click", () => {
        if(input.value === password){
            overlay.style.opacity = "0";
            overlay.style.transition = "opacity 0.4s ease";
            setTimeout(() => overlay.remove(), 400);
        } else {
            attempts++;
            wrongPasswordEffect();
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
