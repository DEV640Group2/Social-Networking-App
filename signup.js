document.getElementById("signupForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");

    emailError.innerText = "";
    passwordError.innerText = "";
    confirmPasswordError.innerText = "";

    // Validate email format (must be a company email)
    if (!email.endsWith("@company.com")) {
        emailError.innerText = "Please use your company email.";
        return;
    }

    // Validate password strength
    if (password.length < 8 || !/\d/.test(password) || !/[A-Z]/.test(password)) {
        passwordError.innerText = "Password must be at least 8 characters, contain a number and an uppercase letter.";
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        confirmPasswordError.innerText = "Passwords do not match.";
        return;
    }

    // Send data to backend
    const response = await fetch("signup.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password })
    });

    const result = await response.json();
    alert(result.message);

    if (result.success) {
        window.location.href = "login.html";
    }
});
