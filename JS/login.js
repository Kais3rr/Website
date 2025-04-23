// Sample list of users and passwords (this list can be manually updated)
const users = [
    { username: "user", password: "password1" },
    { username: "user2", password: "password2" },
    { username: "admin", password: "admin123" }
];

// Reference to the form and error message
const form = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

// Function to check if the login credentials are correct
function checkCredentials(username, password) {
    for (let user of users) {
        if (user.username === username && user.password === password) {
            return true;
        }
    }
    return false;
}

// Handle form submission
form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check if the credentials are correct
    if (checkCredentials(username, password)) {
        // Redirect to welcome page
        window.location.href = "/welcome.html"; 
    } else {
        // Show error message
        errorMessage.style.display = "block";
    }
});
