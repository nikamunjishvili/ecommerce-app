const registerForm = document.getElementById("regiter-form");

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();
    const birthdate = document.getElementById("birthdate").value.trim();

    if(password !== confirmPassword){
        showModal("Passwords do not match!", 'error');
        return;
    }

    if(firstName && lastName && email && password && birthdate){
        localStorage.setItem(
            "user",
            JSON.stringify({firstName, lastName, email, password, birthdate})
        )
        showModal("Registration Successfuly!", "success");
        setTimeout(() => {
            window.location.href = "./login.html";
        },
        2000)
    }else{
        showModal("All fields are required!", 'error');
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