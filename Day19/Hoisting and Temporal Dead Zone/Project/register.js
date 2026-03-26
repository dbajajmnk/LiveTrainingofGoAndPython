const registerForm = document.getElementById('registerForm');
const regMessage = document.getElementById('regMessage');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const userData = {
        name: document.getElementById('newName').value,
        email: document.getElementById('newEmail').value,
        phone: document.getElementById('newPhone').value,
        pass: document.getElementById('newPass').value
    };

    localStorage.setItem('userAccount', JSON.stringify(userData));

    regMessage.textContent = "Account Created! Redirecting...";
    regMessage.style.color = "green";

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1500);
});
