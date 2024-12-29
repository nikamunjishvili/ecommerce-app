document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");
    const profileCard = document.querySelector(".profile-card");

    loader.style.display = 'block'

    profileCard.style.display = 'none';

    setTimeout(() => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));

            if (user) {
                document.getElementById("profile-name").textContent = `${user.firstName} ${user.lastName}`;
                document.getElementById("profile-email").textContent = user.email;
                document.getElementById("profile-bio").textContent = user.bio || "no bio provided.";
                document.getElementById("profile-birthdate").textContent = user.birthdate || "no birthdate provided.";
            } else {
                document.getElementById("profile-name").textContent = `User not found.`;
                document.getElementById("profile-email").textContent = "";
                document.getElementById("profile-bio").textContent = "";
                document.getElementById("profile-birthdate").textContent = "";
            }
        } catch (error) {
            document.getElementById("profile-name".textContent = "error loading profile")
        }

        loader.style.display = "none";
        profileCard.style.display = 'block';
    }, 1000)
})

function editProfile() {
    const user = JSON.parse(localStorage.getItem('user')) || [];

    document.getElementById("profile-name").textContent = `${user.firstName || ""} ${user.lastName || ''}`;
    document.getElementById("profile-email").textContent = user.email || '';
    document.getElementById("profile-bio").textContent = user.bio || "";
    document.getElementById("profile-birthdate").textContent = user.birthdate || "";

    document.getElementById("edit-profile-modal").classList.remove("hidden");
}

function closeModal(){
    document.getElementById("edit-profile-modal").classList.add("hidden");
}

document.getElementById("edit-profile-form").addEventListener("submit", (e) => {
    e.preventDefault();

     const nameParts = document.getElementById("edit-name").value.trim().split(' ');
     const email = document.getElementById("edit-email").value.trim();
     const bio = document.getElementById("edit-bio").value.trim();
     const birthdate = document.getElementById("edit-birthdate").value.trim();

     const user = {
        firstName: nameParts[0] || "Test",
        lastName: nameParts[1] || "Test111",
        email,
        bio,
        birthdate
     }

     localStorage.setItem("user", JSON.stringify(user));

     document.getElementById("profile-name").textContent = `${user.firstName} ${user.lastName}`;
     document.getElementById("profile-email").textContent = user.email;
     document.getElementById("profile-bio").textContent = user.bio;
     document.getElementById("profile-birthdate").textContent = user.birthdate;
 
     closeModal()
})