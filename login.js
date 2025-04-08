document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const rememberMe = document.getElementById("rememberMe").checked;
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    emailError.innerText = "";
    passwordError.innerText = "";

    if (!email.endsWith("@company.com") && email !== "mockuser@company.com") {
        emailError.innerText = "Please use your company email.";
        return;
    }

    // ✅ Mock account
    if (email === "mockuser@company.com" && password === "password123") {
        localStorage.setItem("currentUser", email);
        window.location.href = "playground.html";
        return;
    }

    try {
        const response = await fetch("login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, rememberMe })
        });

        const result = await response.json();

        if (result.success) {
            localStorage.setItem("currentUser", email);
            window.location.href = "playground.html";
        } else {
            passwordError.innerText = result.message || "Invalid email or password.";
        }
    } catch (error) {
        passwordError.innerText = "Network error. Please try again.";
    }
});


