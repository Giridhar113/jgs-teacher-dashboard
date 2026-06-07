document.addEventListener("DOMContentLoaded", function () {
  JGSApp.mount("Leave Approval", "Dashboard > Leave Approval", function (root) {
    var leaves = [
      { id: "leave-1", student: "Rohan Iyer", roll: "CSE303", type: "Medical", from: "2026-06-05", to: "2026-06-06", days: 2, reason: "Fever and doctor visit.", document: "medical-note.pdf", status: "Pending" },
      { id: "leave-2", student: "Kabir Khan", roll: "CSE305", type: "Event", from: "2026-06-07", to: "2026-06-07", days: 1, reason: "Inter-college coding event.", document: "", status: "Pending" }
    ];
    var selected = leaves[0];
    root.innerHTML = '<section class="grid two"><div class="card"><h2>Pending Leave</h2><div id="leaveList" class="list"></div></div><div class="card"><h2 id="leaveTitle">Leave Details</h2><div id="leaveDetails"></div><div class="field" style="margin-top:14px"><label>Comment</label><textarea id="comment" rows="4" placeholder="Optional approval/rejection comment"></textarea></div><div class="actions" style="margin-top:10px"><button class="button green" id="approve">Approve</button><button class="button red" id="reject">Reject</button></div></div></section>';
    function renderList() {
      document.getElementById("leaveList").innerHTML = leaves.map(function (item) {
        return '<button class="item-row" data-leave="' + item.id + '"><span><strong>' + item.student + '</strong><div class="muted">' + item.type + ' - ' + item.from + ' to ' + item.to + '</div></span><span class="status ' + (item.status === "Pending" ? "amber" : item.status === "Approved" ? "green" : "red") + '">' + item.status + '</span></button>';
      }).join("");
      document.querySelectorAll("[data-leave]").forEach(function (button) {
        button.addEventListener("click", function () {
          selected = leaves.find(function (item) { return item.id === button.dataset.leave; });
          renderDetails();
        });
      });
    }
    function renderDetails() {
      document.getElementById("leaveTitle").textContent = selected.student + " - " + selected.roll;
      document.getElementById("leaveDetails").innerHTML = '<div class="list"><div class="item-row"><span>Type</span><strong>' + selected.type + '</strong></div><div class="item-row"><span>Dates</span><strong>' + selected.from + ' to ' + selected.to + '</strong></div><div class="item-row"><span>Days</span><strong>' + selected.days + '</strong></div><div class="item-row"><span>Document</span><strong>' + (selected.document || "Not attached") + '</strong></div><div class="item-row"><span>Reason</span><strong>' + selected.reason + '</strong></div></div>';
    }
    async function update(status) {
      selected.status = status;
      await fetch((window.JGS_API_BASE || "").replace(/\/$/, "") + "/api/teacher/leave/" + selected.id + "/status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(localStorage.getItem("jgs_token") ? { Authorization: "Bearer " + localStorage.getItem("jgs_token") } : {})
        },
        body: JSON.stringify({ status, comment: document.getElementById("comment").value })
      }).catch(console.warn);
      JGSApp.toast("Leave " + status.toLowerCase() + ". Student attendance will reflect approved leave.");
      renderList();
      renderDetails();
    }
    document.getElementById("approve").addEventListener("click", function () { update("Approved"); });
    document.getElementById("reject").addEventListener("click", function () { update("Rejected"); });
    renderList();
    renderDetails();
  });
});
