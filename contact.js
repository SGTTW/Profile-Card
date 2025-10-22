

// Form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Hide success message if it was previously shown
  successMessage.style.display = "none";

  // Validate all fields
  const isNameValid = validateField(nameField, errorName, "name");
  const isEmailValid = validateField(emailField, errorEmail, "email");
  const isSubjectValid = validateField(subjectField, errorSubject, "subject");
  const isMessageValid = validateField(messageField, errorMessage, "message");

  // Check if all validations passed
  const isFormValid =
    isNameValid && isEmailValid && isSubjectValid && isMessageValid;

  if (isFormValid) {
    // Show success message
    successMessage.style.display = "flex";

    // Scroll to success message
    successMessage.scrollIntoView({ behavior: "smooth", block: "center" });

    // Focus on success message for screen readers
    successMessage.focus();

    // Prepare data for submission
    const formData = {
      name: nameField.value,
      email: emailField.value,
      subject: subjectField.value,
      message: messageField.value,
    };

    // Send data to the endpoint
    fetch("https://formspree.io/f/mvgwjoky", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Form submitted successfully:", data);
        // Reset form
        form.reset();
        // Optional: Hide success message after 5 seconds
        setTimeout(() => {
          successMessage.style.display = "none";
        }, 5000);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  } else {
    // Focus on first error field
    if (!isNameValid) {
      nameField.focus();
    } else if (!isEmailValid) {
      emailField.focus();
    } else if (!isSubjectValid) {
      subjectField.focus();
    } else if (!isMessageValid) {
      messageField.focus();
    }
  }
});
