// js/auth.js

function showPopup(msg) {
  alert(msg);
}

function redirectTo(path) {
  window.location.href = path;
}

// SIGN UP HANDLER
const signupBtn = document.querySelector(".signup-btn");
if (signupBtn) {
  signupBtn.addEventListener("click", async () => {
    const name = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email.endsWith("@gmail.com")) {
      return showPopup("Email must end with @gmail.com");
    }

    if (password.length <= 3) {
      return showPopup("Password must be more than 3 characters");
    }

    try {
      const res = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        showPopup("Signup successful!");
        redirectTo("signin.html");
      } else {
        showPopup(data.message || "Signup failed");
      }
    } catch (err) {
      showPopup("Signup error. Try again later.");
    }
  });
}

// SIGN IN HANDLER
const signinBtn = document.querySelector(".signin-btn");
if (signinBtn) {
  signinBtn.addEventListener("click", async () => {
    const emailOrName = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const res = await fetch("http://localhost:5000/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ emailOrName, password }),
      });

      const data = await res.json();
      if (res.ok) {
        redirectTo("index.html");
      } else {
        showPopup(data.message || "Invalid credentials");
      }
    } catch (err) {
      showPopup("Signin error. Try again later.");
    }
  });
}
