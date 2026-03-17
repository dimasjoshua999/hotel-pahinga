// SELECT ROOM → GO TO CHECKOUT
function selectRoom(name, price) {
    localStorage.setItem("room", name);
    localStorage.setItem("price", price);

    window.location.href = "checkin.html";
}

// ===== HELPER: CALCULATE NIGHTS =====
function getNights(checkin, checkout) {
    const inDate = new Date(checkin);
    const outDate = new Date(checkout);
    const diff = (outDate - inDate) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
}

// LOAD SUMMARY (CHECKOUT PAGE)
if (window.location.pathname.includes("checkin.html")) {
    document.addEventListener("DOMContentLoaded", () => {
        let room = localStorage.getItem("room");
        let price = parseInt(localStorage.getItem("price"));

        const summaryBox = document.getElementById("summaryBox");

        function updateSummary() {
            const checkin = document.getElementById("checkinDate").value;
            const checkout = document.getElementById("checkoutDate").value;
            const pax = document.getElementById("pax").value;

            if (!checkin || !checkout) {
                summaryBox.innerHTML = `
                    <h3>${room}</h3>
                    <p>₱${price} / night</p>
                `;
                return;
            }

            const nights = getNights(checkin, checkout);
            const total = nights * price * pax;

            summaryBox.innerHTML = `
                <h3>${room}</h3>
                <p>₱${price} / night</p>
                <p>Check-in: ${checkin}</p>
                <p>Check-out: ${checkout}</p>
                <p>Nights: ${nights}</p>
                <p>Pax: ${pax}</p>
                <h3>Total: ₱${total}</h3>
            `;
        }

        // initial display
        updateSummary();

        // live updates
        document.getElementById("checkinDate").addEventListener("change", updateSummary);
        document.getElementById("checkoutDate").addEventListener("change", updateSummary);
        document.getElementById("pax").addEventListener("input", updateSummary);
    });
}

// CONFIRM → GO TO RECEIPT PAGE
function confirmBooking() {
    let pax = document.getElementById("pax").value;
    let payment = document.getElementById("payment").value;
    let checkin = document.getElementById("checkinDate").value;
    let checkout = document.getElementById("checkoutDate").value;

    if (!checkin || !checkout) {
        alert("Please select dates!");
        return;
    }

    let price = parseInt(localStorage.getItem("price"));
    let nights = getNights(checkin, checkout);

    if (nights <= 0) {
        alert("Invalid date selection!");
        return;
    }

    let total = price * pax * nights;

    // SAVE EVERYTHING
    localStorage.setItem("total", total);
    localStorage.setItem("pax", pax);
    localStorage.setItem("payment", payment);
    localStorage.setItem("nights", nights);
    localStorage.setItem("checkin", checkin);
    localStorage.setItem("checkout", checkout);
    localStorage.setItem("bookingId", "PHG-" + Math.floor(Math.random() * 100000));

    window.location.href = "receipt.html";
}

// ===== QR GENERATOR (FAKE VISUAL) =====
function generateQR(id) {
    const canvas = document.getElementById("qrCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = 150;
    canvas.height = 150;

    for (let i = 0; i < 150; i += 10) {
        for (let j = 0; j < 150; j += 10) {
            if (Math.random() > 0.5) {
                ctx.fillRect(i, j, 8, 8);
            }
        }
    }

    ctx.font = "10px Arial";
    ctx.fillText(id, 10, 140);
}

// RECEIPT PAGE DISPLAY
if (window.location.pathname.includes("receipt.html")) {
    document.addEventListener("DOMContentLoaded", () => {
        let room = localStorage.getItem("room");
        let total = localStorage.getItem("total");
        let payment = localStorage.getItem("payment");
        let pax = localStorage.getItem("pax");
        let nights = localStorage.getItem("nights");
        let checkin = localStorage.getItem("checkin");
        let checkout = localStorage.getItem("checkout");
        let bookingId = localStorage.getItem("bookingId");

        document.getElementById("receiptBox").innerHTML = `
            <h2>Booking Confirmed ✅</h2>
            <p>ID: ${bookingId}</p>
            <p>Room: ${room}</p>
            <p>Check-in: ${checkin}</p>
            <p>Check-out: ${checkout}</p>
            <p>Nights: ${nights}</p>
            <p>Pax: ${pax}</p>
            <p>Payment: ${payment}</p>
            <h3>Total: ₱${total}</h3>
            <canvas id="qrCanvas"></canvas>
        `;

        generateQR(bookingId);

        // POPUP
        alert("Thank you for booking! Pahinga is waiting for you 🏨");
    });
}

function goHome() {
    window.location.href = "index.html";
}