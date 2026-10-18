import { firebaseConfig } from "./firebase_config.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";

// Initialize Firebase.
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get form elements.
const signinForm = document.getElementById("signinForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const signinButton = document.getElementById("signin");
const googleButton = document.getElementById("google");
const signinMessage = document.getElementById("signinMessage");

// Display feedback.
function showMessage(message, type = "error") {
  signinMessage.textContent = message;
  signinMessage.className = `form-message ${type}`;
}

// Handle common Firebase authentication errors.
function getErrorMessage(error) {
  switch (error.code) {
    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Incorrect email or password.";

    case "auth/user-disabled":
      return "This account has been disabled.";

    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";

    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";

    case "auth/popup-closed-by-user":
      return "The Google sign-in window was closed.";

    case "auth/popup-blocked":
      return "Your browser blocked the sign-in popup. Allow popups and try again.";

    case "auth/unauthorized-domain":
      return "This domain is not authorized in Firebase.";

    default:
      return "Sign-in failed. Please try again.";
  }
}

// Sign in with email and password.
signinForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const userEmail = email.value.trim();
  const userPassword = password.value;

  if (!userEmail || !userPassword) {
    showMessage("Please enter your email and password.");
    return;
  }

  signinButton.disabled = true;
  googleButton.disabled = true;

  signinButton.querySelector("span:first-child").textContent = "Signing in...";

  signinMessage.textContent = "";
  signinMessage.className = "form-message";

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      userEmail,
      userPassword,
    );

   console.log("Signed in:", userCredential.user.uid);

   showMessage("Sign-in successful!", "success");

   window.location.replace("dashboard.html");

    
  } catch (error) {
    console.error("Signin error:", error.code);
    showMessage(getErrorMessage(error));
  } finally {
    signinButton.disabled = false;
    googleButton.disabled = false;

    signinButton.querySelector("span:first-child").textContent = "Sign in";
  }
});

// Sign in with Google.
googleButton.addEventListener("click", async function () {
  const provider = new GoogleAuthProvider();

  signinButton.disabled = true;
  googleButton.disabled = true;

  googleButton.querySelector("span").textContent = "Connecting to Google...";

  signinMessage.textContent = "";
  signinMessage.className = "form-message";

  try {
    const userCredential = await signInWithPopup(auth, provider);

   console.log("Google sign-in successful:", userCredential.user.uid);

   showMessage("Google sign-in successful!", "success");

   window.location.replace("dashboard.html");


  } catch (error) {
    console.error("Google sign-in error:", error.code);
    showMessage(getErrorMessage(error));
  } finally {
    signinButton.disabled = false;
    googleButton.disabled = false;

    googleButton.querySelector("span").textContent = "Continue with Google";
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
