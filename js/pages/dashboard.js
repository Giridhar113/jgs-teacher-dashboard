document.addEventListener("DOMContentLoaded", function () {
  JGSApp.mount("Faculty Dashboard", "Dashboard", function (root) {
    JGSApp.get("/api/dashboard/faculty");
    var today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    root.innerHTML = '<section class="grid">' +
      '<div class="card welcome-card"><div><h2>Good morning, Prof. Mehta</h2><div class="muted">Today is ' + today + '</div></div><span class="badge">CSE - Assistant Professor</span></div>' +
      '<div class="grid four">' + JGS_DATA.kpis.map(function (kpi) {
        return '<div class="card kpi"><span class="muted">' + kpi[0] + '</span><span class="kpi-value">' + kpi[1] + '</span><span class="status ' + kpi[2] + '">Live</span></div>';
      }).join("") + '</div>' +
      '<div class="grid two"><section class="card"><h2>Today\'s Schedule</h2><div class="list">' + JGS_DATA.schedule.map(function (item) {
        return '<div class="item-row"><div><strong>' + item.time + ' ' + item.subject + '</strong><div class="muted">' + item.className + ' - ' + item.room + ' - ' + item.students + ' students</div></div><a class="button primary" href="attendance.html">Mark Attendance</a></div>';
      }).join("") + '</div></section>' +
      '<section class="card"><h2>Pending Tasks</h2><div class="list">' + JGS_DATA.tasks.map(function (task) {
        return '<div class="item-row"><div><strong>' + task.title + '</strong><div class="muted">' + task.subject + ' - due ' + task.due + '</div></div><span class="status amber">' + task.status + '</span></div>';
      }).join("") + '</div></section></div>' +
      '<div class="grid two"><section class="card"><h2>Parent Messages</h2><div class="list">' + JGS_DATA.messages.map(function (msg) {
        return '<div class="item-row"><div><strong>' + msg.parent + '</strong><div class="muted">' + msg.student + ' - ' + msg.preview + '</div></div><a class="button" href="parent-messages.html">Reply</a></div>';
      }).join("") + '</div></section>' +
      '<section class="card"><h2>Quick Actions</h2><div class="actions"><a class="button primary" href="attendance.html">Mark Attendance</a><a class="button" href="marks-entry.html">Upload Marks</a><a class="button" href="faculty-notices.html">Post Notice</a><a class="button" href="apply-leave.html">Apply Leave</a><a class="button" href="hr-payroll.html">View Payslip</a></div></section></div>' +
      '</section>';
  });
});
