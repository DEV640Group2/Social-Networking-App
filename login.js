document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const rememberMe = document.getElementById("rememberMe").checked;
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    emailError.innerText = "";
    passwordError.innerText = "";

    if (!email.endsWith("@company.com")) {
        emailError.innerText = "Please use your company email.";
        return;
    }

    const response = await fetch("login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe })
    });

    const result = await response.json();

    if (result.success) {
        window.location.href = "dashboard.html"; // protected page
    } else {
        passwordError.innerText = result.message || "Invalid email or password.";
    }
});
