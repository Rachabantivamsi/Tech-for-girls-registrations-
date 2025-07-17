let clickCount = 0;
const shareBtn = document.getElementById("shareBtn");
const clickCountText = document.getElementById("clickCountText");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("registrationForm");
const successMessage = document.getElementById("successMessage");

// Prevent resubmission if already submitted
if (localStorage.getItem("submitted") === "true") {
  disableForm();
}

shareBtn.addEventListener("click", () => {
  if (clickCount < 5) {
    clickCount++;
   const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community 👩‍💻🚀\n\nRegister here: https://rachabantivamsi.github.io/Tech-for-girls-registrations-/");
window.open(https://wa.me/?text=${message}, "_blank");
    clickCountText.textContent = `Click count: ${clickCount}/5`;

    if (clickCount >= 5) {
      submitBtn.disabled = false;
      clickCountText.textContent = `Sharing complete. Please continue.`;
    }
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (clickCount < 5) {
    alert("Please complete WhatsApp sharing first.");
    return;
  }

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const college = document.getElementById("college").value;
  const fileInput = document.getElementById("screenshot");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please upload a screenshot.");
    return;
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("email", email);
  formData.append("college", college);
  formData.append("file", file);

  try {
    await fetch("https://script.google.com/macros/s/AKfycbz6EoKIFaruFzOtu_riXtW-DvXGZn4klhuPuZMUqZvkmiwkUztn1k6vVcXQL8gZOeoQSw/exec", {
      method: "POST",
      body: formData,
    });

    successMessage.textContent = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
    localStorage.setItem("submitted", "true");
    disableForm();
  } catch (error) {
    alert("Something went wrong while submitting. Please try again.");
    console.error(error);
  }
});

function disableForm() {
  document.querySelectorAll("input, button").forEach((el) => {
    el.disabled = true;
  });
}
