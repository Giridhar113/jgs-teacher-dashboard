document.addEventListener("DOMContentLoaded", function () {
  JGSApp.mount("Apply Leave", "Dashboard > Apply Leave", function (root) {
    root.innerHTML = '<div class="grid two"><section class="card"><h2>Leave Request</h2><form id="leaveForm" class="form-grid"><div class="field"><label>Leave Type</label><select id="leaveType"><option>Casual</option><option>Medical</option><option>Duty</option></select></div><div class="field"><label>From Date</label><input id="fromDate" type="date" required></div><div class="field"><label>To Date</label><input id="toDate" type="date" required></div><div class="field"><label>Reason</label><textarea id="reason" required></textarea></div><button class="button primary">Submit Leave Request</button></form></section><section class="grid"><div class="grid three"><div class="card kpi"><span class="muted">Casual Leave</span><span class="kpi-value">8</span></div><div class="card kpi"><span class="muted">Medical Leave</span><span class="kpi-value">10</span></div><div class="card kpi"><span class="muted">Duty Leave</span><span class="kpi-value">5</span></div></div><div class="card"><h2>Approval Status Tracker</h2><div class="tracker"><div class="tracker-step done"><span class="tracker-dot"></span><span>Request drafted</span></div><div class="tracker-step active"><span class="tracker-dot"></span><span>Awaiting HOD review</span></div><div class="tracker-step"><span class="tracker-dot"></span><span>Principal approval</span></div><div class="tracker-step"><span class="tracker-dot"></span><span>HR record updated</span></div></div></div></section></div>';
    var leaveForm = document.getElementById("leaveForm");
    leaveForm.addEventListener("submit", function (event) {
      event.preventDefault();
      JGSApp.toast("Leave request submitted for approval.");
      leaveForm.reset();
    });
  });
});
