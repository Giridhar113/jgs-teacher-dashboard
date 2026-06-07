(function () {
  var nav = [
    ["faculty-dashboard.html", "Dashboard", "Dashboard"],
    ["class-list.html", "My Classes", "Classes"],
    ["attendance.html", "Mark Attendance", "Attendance"],
    ["bulk-attendance.html", "Bulk Attendance", "Bulk"],
    ["marks-entry.html", "Upload Marks", "Marks"],
    ["gradebook.html", "Gradebook", "Grades"],
    ["assignment-grading.html", "Assignment Grading", "Grading"],
    ["leave-approval.html", "Leave Approval", "Leave OK"],
    ["class-analytics.html", "Class Analytics", "Analytics"],
    ["ptm-bookings.html", "PTM Bookings", "PTM"],
    ["faculty-notices.html", "Notices", "Notices"],
    ["student-doubts.html", "Student Doubts", "Doubts"],
    ["parent-messages.html", "Parent Messages", "Messages"],
    ["faculty-timetable.html", "My Timetable", "Timetable"],
    ["apply-leave.html", "Apply Leave", "Leave"],
    ["hr-payroll.html", "HR & Payroll", "HR"]
  ];

  function currentPage() {
    return location.pathname.split("/").pop() || "faculty-dashboard.html";
  }

  function navHtml(limit) {
    var page = currentPage();
    return nav.slice(0, limit || nav.length).map(function (item) {
      return '<li><a class="nav-link ' + (page === item[0] ? "active" : "") + '" href="' + item[0] + '">' +
        '<span>' + item[2] + '</span></a></li>';
    }).join("");
  }

  function bottomNavHtml() {
    var page = currentPage();
    return nav.slice(0, 5).map(function (item) {
      return '<a class="' + (page === item[0] ? "active" : "") + '" href="' + item[0] + '">' + item[2] + '</a>';
    }).join("");
  }

  function loadEnhancements() {
    if (window.JGSPortalEnhancements) return window.JGSPortalEnhancements.init("teacher");
    var script = document.createElement("script");
    script.src = "js/portal-enhancements.js";
    script.onload = function () { window.JGSPortalEnhancements?.init("teacher"); };
    document.head.appendChild(script);
  }

  window.JGSApp = {
    mount: function (title, breadcrumb, render) {
      window.JGSAuth.ensureFaculty();
      var name = localStorage.getItem("jgs_name") || window.JGS_DATA.faculty.name;
      var dept = localStorage.getItem("jgs_dept") || window.JGS_DATA.faculty.department;
      document.body.innerHTML = '<div class="app-shell">' +
        '<header class="topbar"><div class="topbar-left"><span class="portal-title">JGS - Faculty Portal</span><span class="badge">AY 2025-26</span></div>' +
        '<div class="topbar-right"><button class="icon-button" title="Notifications" aria-label="Notifications">Alerts</button>' +
        '<div class="faculty-chip"><span class="avatar">AM</span><span>' + name + ' - ' + dept + '</span></div>' +
        '<button class="button ghost" data-logout>Logout</button></div></header>' +
        '<aside class="sidebar"><nav><ul class="nav-list">' + navHtml() + '<li><button class="nav-link" data-logout>Logout</button></li></ul></nav></aside>' +
        '<main class="main"><div class="page-head"><div><p class="breadcrumb">' + breadcrumb + '</p><h1>' + title + '</h1></div></div><div id="page-root"></div></main>' +
        '<nav class="bottom-nav">' + bottomNavHtml() + '</nav><div class="toast" id="toast"></div></div>';
      document.querySelectorAll("[data-logout]").forEach(function (button) {
        button.addEventListener("click", window.JGSAuth.logout);
      });
      render(document.getElementById("page-root"));
      loadEnhancements();
    },
    toast: function (message) {
      var toast = document.getElementById("toast");
      if (!toast) return;
      toast.textContent = message;
      toast.classList.add("show");
      setTimeout(function () { toast.classList.remove("show"); }, 2800);
    },
    post: async function (path, payload) {
      var base = window.JGS_API_BASE || "";
      if (!base) return { ok: true, staticMode: true };
      return fetch(base.replace(/\/$/, "") + path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(localStorage.getItem("jgs_token") ? { Authorization: "Bearer " + localStorage.getItem("jgs_token") } : {})
        },
        body: JSON.stringify(payload)
      });
    },
    get: async function (path) {
      var base = window.JGS_API_BASE || "";
      if (!base) return { ok: true, staticMode: true };
      return fetch(base.replace(/\/$/, "") + path, {
        headers: {
          ...(localStorage.getItem("jgs_token") ? { Authorization: "Bearer " + localStorage.getItem("jgs_token") } : {})
        }
      });
    },
    statusClass: function (value) {
      if (String(value).toLowerCase().indexOf("high") >= 0) return "red";
      if (String(value).toLowerCase().indexOf("medium") >= 0 || String(value).toLowerCase().indexOf("pending") >= 0) return "amber";
      return "green";
    }
  };
})();
