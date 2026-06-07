document.addEventListener("DOMContentLoaded", function () {
  JGSApp.mount("Upload Marks", "Dashboard > Upload Marks", function (root) {
    root.innerHTML = '<section class="card"><div class="toolbar"><div class="field"><label>Subject</label><select id="subject"><option>Data Structures</option><option>DBMS</option><option>Python Lab</option></select></div><div class="field"><label>Exam Type</label><select id="exam"><option>Internal</option><option>Mid-Term</option><option>Semester</option></select></div><span class="badge">Max Marks: <strong id="maxMarks">100</strong></span></div><div class="table-wrap"><table><thead><tr><th>Roll No</th><th>Student Name</th><th>Marks</th><th>Auto Grade</th><th>Remarks</th></tr></thead><tbody id="rows"></tbody></table></div><div class="actions" style="margin-top:16px"><button class="button" id="draft">Save Draft</button><button class="button primary" id="submit">Submit for HOD Approval</button></div></section>';
    var rows = document.getElementById("rows");
    var draft = document.getElementById("draft");
    var submit = document.getElementById("submit");
    var subject = document.getElementById("subject");
    var exam = document.getElementById("exam");
    function grade(marks) {
      if (marks === "") return "Pending";
      var value = Number(marks);
      if (value >= 85) return "A";
      if (value >= 70) return "B";
      if (value >= 55) return "C";
      if (value >= 40) return "D";
      return "Needs Support";
    }
    function render() {
      rows.innerHTML = JGS_DATA.students.map(function (student) {
        return '<tr><td>' + student.roll + '</td><td>' + student.name + '</td><td><input class="mini-input marks" type="number" min="0" max="100" required data-roll="' + student.roll + '"></td><td class="grade" data-grade="' + student.roll + '">Pending</td><td><input class="mini-input" data-remarks="' + student.roll + '" placeholder="Remarks"></td></tr>';
      }).join("");
      document.querySelectorAll(".marks").forEach(function (input) {
        input.addEventListener("input", function () {
          var invalid = input.value === "" || Number(input.value) > 100 || Number(input.value) < 0;
          input.classList.toggle("invalid", invalid);
          document.querySelector('[data-grade="' + input.dataset.roll + '"]').textContent = invalid ? "Invalid" : grade(input.value);
        });
      });
    }
    function payload() {
      return Array.from(document.querySelectorAll(".marks")).map(function (input) {
        return { roll: input.dataset.roll, marks: input.value, grade: grade(input.value) };
      });
    }
    function valid() {
      var ok = true;
      document.querySelectorAll(".marks").forEach(function (input) {
        var invalid = input.value === "" || Number(input.value) > 100 || Number(input.value) < 0;
        input.classList.toggle("invalid", invalid);
        if (invalid) ok = false;
      });
      return ok;
    }
    draft.addEventListener("click", function () { JGSApp.toast("Marks draft saved locally for review."); });
    submit.addEventListener("click", async function () {
      if (!valid()) {
        JGSApp.toast("Enter valid marks for every student before submission.");
        return;
      }
      await JGSApp.post("/api/faculty/marks", { subject: subject.value, exam: exam.value, marks: payload() });
      JGSApp.toast("Marks submitted for HOD approval.");
    });
    render();
  });
});
