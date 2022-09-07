"use-strict";
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");

    const spinner = document.getElementById("spinner");

    const successHtml = document.getElementById("successMessage");

    const showSpinner = () => {
        contactForm.classList.add("hidden");
        spinner.classList.add("open");
    };

    const successMessage = (msg) => {
        spinner.classList.remove("open");
        successHtml.classList.add("open");
    };
    const errorMessage = (msg) => {
        spinner.classList.remove("open");
        alert(msg);
    };

    // Collect inputs
    const name = document.getElementById("customer-name");
    const contact = document.getElementById("customer-contact");
    const message = document.getElementById("customer-message");
    const aggree = document.getElementById("aggree-with-privacy");

    name.addEventListener("input", function () {
        if (this.value.trim().length) {
            this.classList.remove("invalid");
        }
    });

    contact.addEventListener("input", function () {
        if (this.value.trim().length) {
            this.classList.remove("invalid");
        }
    });

    message.addEventListener("input", function () {
        if (this.value.trim().length) {
            this.classList.remove("invalid");
        }
    });

    aggree.addEventListener("input", function () {
        if (this.value.trim().length) {
            this.classList.remove("invalid");
        }
    });
    const formSubmitHandler = async (e) => {
        e.preventDefault();

        // Clear invalids
        name.classList.remove("invalid");
        contact.classList.remove("invalid");
        message.classList.remove("invalid");
        aggree.classList.remove("invalid");

        const formIsValid =
            name.value !== "" &&
            contact.value !== "" &&
            message.value !== "" &&
            aggree.checked === true;

        // Check validity
        if (name.value === "") {
            name.classList.add("invalid");
        }
        if (contact.value === "") {
            contact.classList.add("invalid");
        }
        if (message.value === "") {
            message.classList.add("invalid");
        }
        if (aggree.checked !== true) {
            aggree.classList.add("invalid");
        }
        if (!formIsValid) {
            return;
        }
        // Proceed to send after validation
        showSpinner();

        // Prepare form
        let formData = new FormData();

        formData.append("customer-name", name.value);
        formData.append("customer-contact", contact.value);
        formData.append("customer-message", message.value);

        // Try send email
        let response = await fetch("/wp-json/vsbl/v1/emails", {
            body: formData,
            method: "post",
        });

        const serverData = await response.json();

        // Result
        if (serverData.status === 200) {
            // Email Sent
            successMessage(serverData.message);
        } else {
            // Error
            errorMessage(serverData.message);
        }
    };
    if (contactForm) {
        contactForm.addEventListener("submit", formSubmitHandler);
    }
});
