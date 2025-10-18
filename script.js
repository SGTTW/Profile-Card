// Update current time in milliseconds
function updateTime() {
  const timeElement = document.getElementById("currentTime");
  if (timeElement) {
    const currentTimeMs = Date.now();
    timeElement.textContent = `Current time: ${currentTimeMs}ms`;
    timeElement.setAttribute("datetime", new Date(currentTimeMs).toISOString());
  }
}



// Initialize time on page load
updateTime();

// Update time every second to keep it current
setInterval(updateTime, 1000);

// Optional: Add keyboard navigation enhancements
document.addEventListener("DOMContentLoaded", () => {
  // Announce dynamic content changes to screen readers
  const timeElement = document.getElementById("currentTime");
  if (timeElement) {
    timeElement.setAttribute("aria-live", "polite");
    timeElement.setAttribute("aria-atomic", "true");
  }

  // Add visible focus indicators for better accessibility
  const focusableElements = document.querySelectorAll(
    "a, button, input, select, textarea"
  );

  focusableElements.forEach((element) => {
    element.addEventListener("focus", function () {
      this.classList.add("has-focus");
    });

    element.addEventListener("blur", function () {
      this.classList.remove("has-focus");
    });
  });

  // Log test IDs for verification (useful during development)
  if (process?.env?.NODE_ENV === "development") {
    console.log("Profile Card Test IDs:", {
      card: document.querySelector('[data-testid="test-profile-card"]'),
      name: document.querySelector('[data-testid="test-user-name"]'),
      bio: document.querySelector('[data-testid="test-user-bio"]'),
      time: document.querySelector('[data-testid="test-user-time"]'),
      avatar: document.querySelector('[data-testid="test-user-avatar"]'),
      socialLinks: document.querySelector(
        '[data-testid="test-user-social-links"]'
      ),
      hobbies: document.querySelector('[data-testid="test-user-hobbies"]'),
      dislikes: document.querySelector('[data-testid="test-user-dislikes"]'),
    });
  }
});

// Optional: Handle image upload for avatar (if you want to add this feature)
function handleAvatarUpload(file) {
  if (!file || !file.type.startsWith("image/")) {
    console.error("Please upload a valid image file");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const avatarImg = document.querySelector(
      '[data-testid="test-user-avatar"]'
    );
    if (avatarImg) {
      avatarImg.src = e.target.result;
    }
  };

  reader.readAsDataURL(file);
}

// Export functions for testing (if using module system)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    updateTime,
    handleAvatarUpload,
  };
}
