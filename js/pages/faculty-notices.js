document.addEventListener("DOMContentLoaded", function () {
  JGSApp.mount("Notices", "Dashboard > Notices", function (root) {
    root.innerHTML = '<div class="grid two"><section class="card"><h2>Post Notice to Own Class</h2><form id="noticeForm" class="form-grid"><div class="field"><label>Notice Title</label><input id="title" required></div><div class="field"><label>Body</label><textarea id="body" required></textarea></div><div class="field"><label>Target Class</label><select id="target"><option>CSE Sem 3 Sec A</option><option>CSE Sem 3 Sec B</option><option>CSE Sem 3 Lab Batch</option></select></div><div class="field"><label>Priority</label><select id="priority"><option>Normal</option><option>High</option><option>Urgent</option></select></div><div class="field"><label>Expiry Date</label><input id="expiry" type="date" required></div><button class="button primary">Post Notice</button></form></section><section class="card"><h2>Posted Notices</h2><div id="noticeList" class="list"></div></section></div>';
    var noticeForm = document.getElementById("noticeForm");
    var noticeList = document.getElementById("noticeList");
    var title = document.getElementById("title");
    var body = document.getElementById("body");
    var target = document.getElementById("target");
    var priority = document.getElementById("priority");
    var expiry = document.getElementById("expiry");
    function render() {
      noticeList.innerHTML = JGS_DATA.notices.map(function (notice) {
        return '<div class="item-row"><div><strong>' + notice.title + '</strong><div class="muted">' + notice.target + ' - expires ' + notice.expires + '</div></div><div class="actions"><span class="status ' + (notice.priority === "High" ? "red" : "blue") + '">' + notice.priority + '</span><span class="status green">' + notice.reads + ' read</span></div></div>';
      }).join("");
    }
    noticeForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      JGS_DATA.notices.unshift({ title: title.value, target: target.value, priority: priority.value, expires: expiry.value, reads: 0 });
      await JGSApp.post("/api/admin/notices", { title: title.value, body: body.value, target: target.value, priority: priority.value, expiry: expiry.value });
      noticeForm.reset();
      render();
      JGSApp.toast("Notice posted to selected class.");
    });
    render();
  });
});
