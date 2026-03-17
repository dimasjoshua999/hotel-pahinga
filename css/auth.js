function login() {
    let name = document.getElementById("nameInput").value;
    let password = document.getElementById("passwordInput").value;

    if (password !== "user123") {
        alert("Wrong password! (hint: user123)");
        return;
    }

    if (name.trim() === "") {
        alert("Enter your name");
        return;
    }

    localStorage.setItem("user", name);
    window.location.href = "index.html";
}

function guest() {
    localStorage.setItem("user", "Guest");
    window.location.href = "index.html";
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}