document.addEventListener("DOMContentLoaded", () => {

    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const resetButton = document.getElementById("reset");
    const form = document.getElementById("form");

    resetButton.addEventListener("click", () => {
        console.log("Reset button clicked");
        email.value = "";
        password.value = "";
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const userEmail = email.value;
        const userPassword = password.value;

        console.log("Email:", userEmail);
        console.log("Password:", userPassword);
    });

});