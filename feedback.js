// Function to validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to set error message
function setError(inputGroup, message) {
    const errorElement = inputGroup.querySelector(".error");
    errorElement.innerText = message;
    inputGroup.classList.add("error");
    inputGroup.classList.remove("success");
}

// Function to set success
function setSuccess(inputGroup) {
    const errorElement = inputGroup.querySelector(".error");
    errorElement.innerText = "";
    inputGroup.classList.add("success");
    inputGroup.classList.remove("error");
}

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form");
    const modal = document.getElementById("thankYouModal");
    const goToMainMenuButton = document.getElementById("goToMainMenu");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission

        if (validateInputs()) {
            const recipientEmail = "skshan8983@gmail.com"; // Replace with your email address
            const subject = "Feedback Form Submission";
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;
            const website = document.getElementById("website").value;
            const message = document.getElementById("message").value;

            const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0AWebsite: ${website}%0D%0AMessage: ${message}`;

            const mailtoLink = `mailto:$skshan8983@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Simulate sending email (for demonstration)
            // window.location.href = mailtoLink;

            modal.style.display = "block"; // Show the modal
            form.reset(); // Clear the form fields
        } else {
            const unfilledField = document.querySelector(".input-group.error");
            if (unfilledField) {
                unfilledField.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    });

    goToMainMenuButton.addEventListener("click", function() {
        modal.style.display = "none"; // Hide the modal
        window.location.href = "home.html"; // Redirect to the main menu
    });

    // Form validation function
    function validateInputs() {
        const inputName = document.getElementById("name");
        const inputEmail = document.getElementById("email");
        const inputPhone = document.getElementById("phone");
        const inputWebsite = document.getElementById("website");
        const inputMessage = document.getElementById("message");

        let isValid = true;

        if (inputName.value.trim() === "") {
            setError(inputName.parentElement, "Name is required");
            isValid = false;
        } else {
            setSuccess(inputName.parentElement);
        }

        if (inputEmail.value.trim() === "") {
            setError(inputEmail.parentElement, "Email is required");
            isValid = false;
        } else if (!validateEmail(inputEmail.value.trim())) {
            setError(inputEmail.parentElement, "Enter a valid email");
            isValid = false;
        } else {
            setSuccess(inputEmail.parentElement);
        }

        if (inputPhone.value.trim() === "") {
            setError(inputPhone.parentElement, "Phone is required");
            isValid = false;
        } else {
            setSuccess(inputPhone.parentElement);
        }

        if (inputWebsite.value.trim() === "") {
            setError(inputWebsite.parentElement, "Website is required");
            isValid = false;
        } else {
            setSuccess(inputWebsite.parentElement);
        }

        if (inputMessage.value.trim() === "") {
            setError(inputMessage.parentElement, "Message is required");
            isValid = false;
        } else {
            setSuccess(inputMessage.parentElement);
        }

        return isValid;
    }
});

