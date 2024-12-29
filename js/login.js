const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if(storedUser && storedUser.email === email && storedUser.password === password){
        localStorage.setItem('isLoggedin', 'true');
        showModal(`Welcome back, ${storedUser.firstName}`, 'success');
        setTimeout(() => {
            window.location.href = './home.html';
        }, 2000)
    }else{
        showModal("Invalid email or password!", 'error');
    }
})

function showModal(message, type){
    const modal = document.getElementById('modal');
    modal.textContent = message;
    modal.className = type;
    modal.style.display = 'flex';

    setTimeout(() => {
        modal.style.display = "none";
    }, 3000)
}