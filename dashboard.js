
import { firebaseConfig } from "./firebase_config.js";

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";

// Initialize Firebase.
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get dashboard elements.
const userName = document.getElementById("userName");
const accountName = document.getElementById("accountName");
const accountEmail = document.getElementById("accountEmail");
const userAvatar = document.getElementById("userAvatar");
const providerName = document.getElementById("providerName");
const verificationStatus = document.getElementById("verificationStatus");
const logoutButton = document.getElementById("logout");
const dashboardMessage = document.getElementById("dashboardMessage");

// Protect the dashboard and display authenticated user information.
onAuthStateChanged(auth, function (user) {
    if (!user) {
        window.location.replace("login.html");
        return;
    }

    const email = user.email || "No email available";

    // Use the display name when available, otherwise use the email prefix.
    const name = user.displayName || email.split("@")[0] || "User";

    userName.textContent = name;
    accountName.textContent = name;
    accountEmail.textContent = email;

    userAvatar.textContent = name.charAt(0).toUpperCase();

    // Detect the provider used by this account.
    const providers = user.providerData.map(
        (provider) => provider.providerId
    );

    if (providers.includes("google.com")) {
        providerName.textContent = "Google";
    } else if (providers.includes("password")) {
        providerName.textContent = "Email & Password";
    } else {
        providerName.textContent = "Other";
    }

    verificationStatus.textContent = user.emailVerified
        ? "Verified"
        : "Not verified";
});

// Sign out the current user.
logoutButton.addEventListener("click", async function () {
    logoutButton.disabled = true;
    logoutButton.textContent = "Signing out...";

    try {
        await signOut(auth);

        // Replace the dashboard in browser history.
        window.location.replace("login.html");

    } catch (error) {
        console.error("Sign-out error:", error.code);

        dashboardMessage.textContent =
            "Unable to sign out. Please try again.";

        dashboardMessage.className = "form-message error";

        logoutButton.disabled = false;
        logoutButton.innerHTML =
            'Sign out <span aria-hidden="true">↗</span>';
    }
});
