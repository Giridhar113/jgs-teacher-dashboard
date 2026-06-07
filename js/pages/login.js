document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("loginForm");
  var password = document.getElementById("password");
  var toggle = document.getElementById("togglePassword");
  var otp = document.getElementById("sendOtp");
  var status = document.getElementById("loginStatus");

  toggle.addEventListener("click", function () {
    password.type = password.type === "password" ? "text" : "password";
    toggle.textContent = password.type === "password" ? "Show" : "Hide";
  });

  otp.addEventListener("click", function () {
    status.textContent = "OTP UI ready. Configure backend under window.JGS_API_BASE to send live OTPs.";
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    status.textContent = "Signing in...";
    await window.JGSAuth.login(document.getElementById("identity").value, password.value);
  });
});
