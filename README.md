
# Firebase Authentication Web App

A responsive authentication web application built using HTML, CSS, JavaScript, and Firebase Authentication. This project allows users to create an account, sign in using email and password or Google, view their account information on a dashboard, and securely sign out.

## Features

- **User Registration:** Create an account using email and password.
- **User Login:** Sign in with registered email and password.
- **Google Authentication:** Sign in using a Google account.
- **Dashboard:** Display the authenticated user's account information.
- **Protected Dashboard:** Redirect unauthenticated users to the login page.
- **Sign Out:** Sign out of the current Firebase session.
- **Password Visibility:** Show or hide the password while entering it.
- **Error Handling:** Display understandable authentication error messages.
- **Responsive Design:** Adapt the interface to desktop, tablet, and mobile screens.
- **Email Verification Status:** Display whether the user's email address is verified.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES Modules)
- Firebase Authentication
- Firebase JavaScript SDK

## Project Structure

```text
firebase-auth/
├── index.html
├── script.js
├── login.html
├── login.js
├── dashboard.html
├── dashboard.js
├── dashboard.css
├── style.css
├── firebase_config.js
└── README.md
```

## Getting Started

### Prerequisites

- A modern web browser.
- Visual Studio Code or another code editor.
- A Google account to create a Firebase project.
- The Live Server extension for VS Code, or another local development server.

### 1. Clone the Repository

Replace `YOUR_USERNAME` with your GitHub username and `YOUR_REPOSITORY` with your repository name.

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

Navigate to the project directory:

```bash
cd YOUR_REPOSITORY
```

### 2. Create a Firebase Project

1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Create a new Firebase project or select an existing one.
3. Register a web application in your project.
4. Copy the Firebase web configuration.
5. Open **Authentication → Sign-in method**.
6. Enable the **Email/Password** provider.
7. Enable the **Google** provider if you want Google sign-in.
8. Add your local development domain to the authorized domains if necessary.

### 3. Configure Firebase

Create or update `firebase_config.js` in the project's root directory:

```javascript
export const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_FIREBASE_APP_ID"
};
```

Replace the placeholder values with the configuration provided by Firebase.

**Note:** Firebase web configuration is intended to be available to client-side applications. Never add Firebase service-account private keys, Admin SDK credentials, or other server-side secrets to this file or your public repository.

### 4. Run the Project

1. Open the project folder in VS Code.
2. Install the Live Server extension if it is not already installed.
3. Right-click `index.html`.
4. Select **Open with Live Server**.
5. Create an account and test the authentication flow.

Use a local development server rather than opening the HTML files directly with `file://`.

## Authentication Flow

1. **Sign Up:** A new user registers with an email address and password.
2. **Sign In:** The user authenticates with email and password or Google.
3. **Dashboard:** Firebase checks the authentication state and displays the user's account information.
4. **Sign Out:** The user signs out and returns to the login page.
5. **Access Protection:** Unauthenticated users attempting to access the dashboard are redirected to the login page.

## Security Considerations

- Configure Firebase Authentication providers correctly.
- Review authorized domains for your application.
- Use Firebase Security Rules to protect Firestore and Storage data if those services are added.
- Never commit private service-account credentials or server-side secrets.
- Remember that client-side dashboard redirects do not replace backend authorization or Firebase Security Rules.

## Learning Objectives

This project provides practical experience with:

- Working with Firebase Authentication.
- Creating and authenticating user accounts.
- Using JavaScript ES modules and asynchronous functions.
- Handling authentication errors with `try...catch`.
- Managing authentication state with `onAuthStateChanged()`.
- Implementing protected pages and browser redirects.
- Building responsive user interfaces with CSS.
- Organizing a multi-page web development project.

## Future Improvements

- Add a password reset feature.
- Implement email verification.
- Add a user profile update feature.
- Improve session and authentication-state handling.
- Deploy the application using Firebase Hosting.

## Author

**Muntazir Hussain**

Computer Science Graduate | MERN Stack Developer in Training

- GitHub: [Muntazir805](https://github.com/Muntazir805)
- LinkedIn: [Muntazir Hussain](https://www.linkedin.com/in/muntazir-hussain-a22931414/)

## License

This project is available for educational and learning purposes. You may adapt it for your own projects.
