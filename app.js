// ==========================================
// SAHNA SERVICE POINT MATRIMONY
// Main JavaScript
// ==========================================

// अपनी Supabase जानकारी यहाँ डालें
const SUPABASE_URL = "https://gqohlbnnsxatjyyacjhm.supabase.co";
const SUPABASE_KEY = "sb_publishable_I-MvPhhHQsexbJIN-ueawA_5oxdJhsJ";

// Supabase library अपने आप load करें
const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
script.onload = startApp;
document.head.appendChild(script);


// ==========================================
// APP START
// ==========================================

function startApp() {

  const { createClient } = window.supabase;

  window.supabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

  // ========================================
  // LOGIN
  // ========================================

  const loginForm = document.querySelector("form");

  if (loginForm && window.location.pathname.toLowerCase().includes("login")) {

    loginForm.addEventListener("submit", async function (e) {

      e.preventDefault();

      const emailInput = loginForm.querySelector('input[type="email"]');
      const passwordInput = loginForm.querySelector('input[type="password"]');

      if (!emailInput || !passwordInput) {
        alert("Login form नहीं मिला।");
        return;
      }

      const email = emailInput.value.trim();
      const password = passwordInput.value;

      if (!email || !password) {
        alert("कृपया Email और Password भरें।");
        return;
      }

      const button =
        loginForm.querySelector("button") ||
        loginForm.querySelector('input[type="submit"]');

      if (button) {
        button.disabled = true;
        button.textContent = "Login हो रहा है...";
      }

      try {

        const { data, error } =
          await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
          });

        if (error) {
          alert("Login असफल: " + error.message);

          if (button) {
            button.disabled = false;
            button.textContent = "♥ Login करें";
          }

          return;
        }

        alert("Login सफल हुआ! ❤️");

        // Login के बाद Home Page
        window.location.href = "profile.html";

      } catch (err) {

        console.error(err);
        alert("Login करते समय समस्या हुई।");

        if (button) {
          button.disabled = false;
          button.textContent = "♥ Login करें";
        }
      }

    });
  }
}

// ===============================
// REGISTRATION
// ===============================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

  registerForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const emailInput = registerForm.querySelector('input[type="email"]');
    const passwordInput = registerForm.querySelector('input[type="password"]');
    const button = registerForm.querySelector('button[type="submit"]');

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
      alert("कृपया Email और Password भरें।");
      return;
    }

    if (button) {
      button.disabled = true;
      button.textContent = "Registration हो रही है...";
    }

    try {

      const { data, error } =
        await window.supabaseClient.auth.signUp({
          email: email,
          password: password
        });

      if (error) {
        console.error(error);
        alert("Registration असफल: " + error.message);

        if (button) {
          button.disabled = false;
          button.textContent = "Register Now";
        }

        return;
      }

      alert("Registration सफल हुआ ❤️");

      window.location.href = "login.html";

    } catch (err) {

      console.error(err);
      alert("Registration करते समय समस्या हुई।");

      if (button) {
        button.disabled = false;
        button.textContent = "Register Now";
      }
    }

  });

}