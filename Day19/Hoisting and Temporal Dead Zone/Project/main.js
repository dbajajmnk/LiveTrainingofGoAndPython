const loginForm = document.getElementById('loginForm');
const message = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (user === "admin" && pass === "1234") {
        document.body.style.backgroundColor = "lightgreen";
        message.textContent = "Login Successful!";
    } else {
        document.body.style.backgroundColor = "tomato";
        message.textContent = "Try Again";
    }
});

resetBtn.addEventListener('click', () => {
    document.body.style.backgroundColor = "white";
    message.textContent = "";
});
