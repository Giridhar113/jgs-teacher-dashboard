document.addEventListener("DOMContentLoaded", function () {
  JGSApp.mount("Mark Attendance", "Dashboard > Mark Attendance", function (root) {
    root.innerHTML = '<section class="card"><div class="toolbar"><div class="field"><label>Subject</label><select id="subject"><option>Data Structures</option><option>DBMS</option><option>Python Lab</option></select></div><div class="field"><label>Class / Section</label><select id="className"><option>CSE Sem 3 Sec A</option><option>CSE Sem 3 Sec B</option><option>CSE Sem 3</option></select></div><div class="field"><label>Date</label><input id="date" type="date"></div><button class="button green" id="allPresent">Bulk All Present</button></div><div class="table-wrap"><table><thead><tr><th>Roll No</th><th>Name</th><th>Present</th><th>Absent</th><th>Remarks</th></tr></thead><tbody id="rows"></tbody></table></div><div class="item-row" style="margin-top:16px"><div id="summary" class="actions"></div><button class="button primary" id="save">Save Attendance</button></div></section>';
    var state = {};
    document.getElementById("date").valueAsDate = new Date();
    function renderRows() {
      document.getElementById("rows").innerHTML = JGS_DATA.students.map(function (student) {
        var value = state[student.roll] || "";
        return '<tr><td>' + student.roll + '</td><td>' + student.name + '</td><td><button class="button green mark" data-roll="' + student.roll + '" data-value="Present">' + (value === "Present" ? "Present - Set" : "Present") + '</button></td><td><button class="button red mark" data-roll="' + student.roll + '" data-value="Absent">' + (value === "Absent" ? "Absent - Set" : "Absent") + '</button></td><td><input class="mini-input" data-remark="' + student.roll + '" placeholder="Remarks"></td></tr>';
      }).join("");
      document.querySelectorAll(".mark").forEach(function (button) {
        button.addEventListener("click", function () {
          state[button.dataset.roll] = button.dataset.value;
          renderRows();
        });
      });
      renderSummary();
    }
    function renderSummary() {
      var values = Object.values(state);
      var present = values.filter(function (v) { return v === "Present"; }).length;
      var absent = values.filter(function (v) { return v === "Absent"; }).length;
      var pending = JGS_DATA.students.length - present - absent;
      document.getElementById("summary").innerHTML = '<span class="status green">Present ' + present + '</span><span class="status red">Absent ' + absent + '</span><span class="status amber">Not Marked ' + pending + '</span>';
    }
    document.getElementById("allPresent").addEventListener("click", function () {
      JGS_DATA.students.forEach(function (student) { state[student.roll] = "Present"; });
      renderRows();
    });
    document.getElementById("save").addEventListener("click", async function () {
      await JGSApp.post("/api/faculty/attendance", {
        subject: document.getElementById("subject").value,
        className: document.getElementById("className").value,
        date: document.getElementById("date").value,
        attendance: state
      });
      JGSApp.toast("Attendance saved successfully.");
    });
    renderRows();
  });
});
