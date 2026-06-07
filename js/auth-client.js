(function () {
  function apiUrl(path) {
    var base = window.JGS_API_BASE || "";
    return base ? base.replace(/\/$/, "") + path : "";
  }

  function demoModeAllowed() {
    return location.protocol === "file:" || ["localhost", "127.0.0.1"].indexOf(location.hostname) >= 0 || localStorage.getItem("jgs_demo_mode") === "true";
  }

  window.JGSAuth = {
    ensureFaculty: function () {
      if (localStorage.getItem("jgs_role") !== "faculty") {
        window.location.replace("teacher-login.html");
      }
    },
    login: async function (identity, password) {
      var payload = { identity: identity, password: password, role: "faculty" };
      var url = apiUrl("/api/auth/login");

      if (url) {
        try {
          var response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
          if (response.ok) {
            var result = await response.json();
            if (result.token) localStorage.setItem("jgs_token", result.token);
          } else {
            throw new Error("Login failed. Check your credentials or contact IT Support.");
          }
        } catch (error) {
          if (!demoModeAllowed()) throw error;
          console.warn("Backend login unavailable; continuing with static faculty session.", error);
        }
      } else if (!demoModeAllowed()) {
        throw new Error("Faculty portal backend is not configured. Contact IT support.");
      }

      localStorage.setItem("jgs_role", "faculty");
      localStorage.setItem("jgs_name", "Prof. Asha Mehta");
      localStorage.setItem("jgs_dept", "CSE");
      localStorage.setItem("jgs_designation", "Assistant Professor");
      window.location.href = "faculty-dashboard.html";
    },
    logout: function () {
      Object.keys(localStorage)
        .filter(function (key) { return key.indexOf("jgs_") === 0; })
        .forEach(function (key) { localStorage.removeItem(key); });
      window.location.href = "teacher-login.html";
    }
  };
})();
