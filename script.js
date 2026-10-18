

import { firebaseConfig } from "./firebase_config.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";

// Initialize Firebase.
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get form elements.
const signupForm = document.getElementById("signupForm");
const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");
const signupButton = document.getElementById("signup");
const signupMessage = document.getElementById("signupMessage");

// Display a message to the user.
function showMessage(message, type = "error") {
  signupMessage.textContent = message;
  signupMessage.className = `form-message ${type}`;
}

// Convert Firebase errors into readable messages.
function getErrorMessage(error) {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "This email is already registered. Please sign in.";

    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/weak-password":
      return "Your password is too weak. Use at least 6 characters.";

    case "auth/operation-not-allowed":
      return "Email and password registration is not enabled.";

    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";

    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";

    default:
      return "Unable to create your account. Please try again.";
  }
}

// Register a new user.
signupForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = userEmail.value.trim();
  const password = userPassword.value;

  if (!email || !password) {
    showMessage("Please fill in all required fields.");
    return;
  }

  signupButton.disabled = true;
  signupButton.querySelector("span:first-child").textContent =
    "Creating account...";
  signupMessage.textContent = "";
  signupMessage.className = "form-message";

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    console.log("Account created:", userCredential.user.uid);

    showMessage(
      "Account created successfully! Redirecting to sign in...",
      "success",
    );

    signupForm.reset();

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1200);
  } catch (error) {
    console.error("Signup error:", error.code);

    showMessage(getErrorMessage(error));

    signupButton.disabled = false;
    signupButton.querySelector("span:first-child").textContent =
      "Create account";
  }
});

// Toggle password visibility.
document.querySelectorAll(".password-toggle").forEach((button) => {
  button.addEventListener("click", function () {
    const input = document.getElementById(this.dataset.toggle);

    const isPassword = input.type === "password";

    input.type = isPassword ? "text" : "password";
    this.textContent = isPassword ? "Hide" : "Show";
    this.setAttribute(
      "aria-label",
      isPassword ? "Hide password" : "Show password",
    );
  });
});
