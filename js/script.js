// LOGIN FUNCTIONS
function login() {
    let username = document.getElementById("username").value;
    if (username === "") {
        alert("Enter your name!");
        return;
    }
    startSession(username);
}

function guest() {
    startSession("Guest");
}

function startSession(name) {
    localStorage.setItem("user", name);
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("mainPage").classList.remove("hidden");
}

function logout() {
    localStorage.removeItem("user");
    location.reload();
}

// CHECK-IN SIMULATION
function checkIn(room) {
    let pax = event.target.parentElement.querySelector(".pax").value;
    alert(`Checked in to ${room} for ${pax} person(s)!`);
}

// CHATBOT (SIMULATED AI)
function sendMessage() {
    let input = document.getElementById("chatInput");
    let msg = input.value.trim();
    if (msg === "") return;

    addMessage(msg, "user");

    let reply = getBotReply(msg);
    setTimeout(() => addMessage(reply, "bot"), 500);

    input.value = "";
}

function addMessage(text, type) {
    let messages = document.getElementById("messages");
    let div = document.createElement("div");
    div.className = type;
    div.innerText = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

// SIMPLE AI RESPONSES
function getBotReply(msg) {
    msg = msg.toLowerCase();

    if (msg.includes("price")) return "Rooms range from ₱1,500 to ₱5,000.";
    if (msg.includes("check in")) return "Check-in is at 2:00 PM.";
    if (msg.includes("location")) return "We are located in a peaceful area perfect for relaxation.";
    if (msg.includes("hello")) return "Hello! Welcome to Pahinga Hotel 😊";

    return "I'm here to help! Ask about rooms, prices, or services.";
}