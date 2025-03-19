document.getElementById("forgotPasswordForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const emailError = document.getElementById("emailError");
    emailError.innerText = "";

    if (!email.endsWith("@company.com")) {
        emailError.innerText = "Please use your company email.";
        return;
    }

    const response = await fetch("forgot-password.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    });

    const result = await response.json();
    alert(result.message);
});
