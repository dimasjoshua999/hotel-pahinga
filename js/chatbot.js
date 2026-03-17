function toggleChat() {
    const box = document.getElementById("chatbox");
    box.classList.toggle("hidden");
}

function sendMessage() {
    let input = document.getElementById("chatInput");
    let msg = input.value.trim();

    if (msg === "") return;

    let messages = document.getElementById("messages");

    messages.innerHTML += `<div><b>You:</b> ${msg}</div>`;

    let botReply = getReply(msg);
    messages.innerHTML += `<div style="color:#3a7bd5"><b>Bot:</b> ${botReply}</div>`;

    input.value = ""; // ✅ clears after send
    messages.scrollTop = messages.scrollHeight;
}

function getReply(msg) {
    msg = msg.toLowerCase();

    if (msg.includes("price")) return "Rooms range from ₱1,500 to ₱5,000.";
    if (msg.includes("check in")) return "Check-in is available anytime on-site, you can also appoint on our website.";
    if (msg.includes("location")) return "We are in a peaceful relaxing area, Sampaguita st. Caloocan City.";
    if (msg.includes("hello") || msg.includes("hi")) return "Hello! Welcome to Pahinga, your go-to hotel for relaxation 😊";
    if (msg.includes("rooms") || msg.includes("bookings")) return "Standard, Deluxe, and Suite rooms available! Each designed for your comfort.";
    if (msg.includes("standard")) return "starts at ₱1,500/night, perfect for solo travelers or couples.";
    if (msg.includes("deluxe")) return "starts at ₱3,000/night, ideal for small families or groups.";
    if (msg.includes("suite")) return "starts at ₱5,000/night, our most luxurious option for ultimate comfort.";
    if (msg.includes("thanks") || msg.includes("thank you") || msg.includes("ty")) return "You're welcome! Is there anything else I can help you with?";
    return "Ask me about rooms, prices, or bookings!";
}

