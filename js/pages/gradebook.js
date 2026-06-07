document.addEventListener("DOMContentLoaded", function () {
  JGSApp.mount("Gradebook", "Dashboard > Gradebook", function (root) {
    root.innerHTML = '<section class="card"><div class="toolbar"><div class="field"><label>Class</label><select id="className"><option>CSE Sem 3 Sec A</option><option>CSE Sem 3 Sec B</option></select></div><div class="field"><label>Exam Type</label><select id="examType"><option>Internal</option><option>Mid-Term</option><option>Final</option></select></div><button class="button" id="exportCsv">Export CSV</button><button class="button primary" id="saveAll">Save All</button></div><div class="table-wrap"><table class="spreadsheet"><thead><tr><th>Roll No</th><th>Student</th><th>Marks</th><th>Grade</th><th>Remarks</th></tr></thead><tbody id="gradeRows"></tbody></table></div></section>';
    var rows = document.getElementById("gradeRows");
    function grade(value) {
      var n = Number(value);
      if (Number.isNaN(n)) return "-";
      if (n >= 85) return "A";
      if (n >= 70) return "B";
      if (n >= 55) return "C";
      if (n >= 40) return "D";
      return "F";
    }
    function render() {
      rows.innerHTML = JGS_DATA.students.map(function (student) {
        return '<tr><td>' + student.roll + '</td><td>' + student.name + '</td><td><input class="mini-input mark-cell" type="number" min="0" max="100" value="' + student.marks + '" data-roll="' + student.roll + '"></td><td data-grade="' + student.roll + '">' + grade(student.marks) + '</td><td><input class="mini-input" data-remarks="' + student.roll + '" placeholder="Optional"></td></tr>';
      }).join("");
      document.querySelectorAll(".mark-cell").forEach(function (input) {
        input.addEventListener("input", function () {
          document.querySelector('[data-grade="' + input.dataset.roll + '"]').textContent = grade(input.value);
        });
      });
    }
    function payload() {
      return Array.from(document.querySelectorAll(".mark-cell")).map(function (input) {
        return {
          roll: input.dataset.roll,
          marks: Number(input.value),
          grade: grade(input.value),
          remarks: document.querySelector('[data-remarks="' + input.dataset.roll + '"]').value
        };
      });
    }
    document.getElementById("saveAll").addEventListener("click", async function () {
      await fetch((window.JGS_API_BASE || "").replace(/\/$/, "") + "/api/teacher/marks/bulk", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(localStorage.getItem("jgs_token") ? { Authorization: "Bearer " + localStorage.getItem("jgs_token") } : {})
        },
        body: JSON.stringify({ className: document.getElementById("className").value, examType: document.getElementById("examType").value, marks: payload() })
      }).catch(console.warn);
      JGSApp.toast("Gradebook saved for " + payload().length + " students.");
    });
    document.getElementById("exportCsv").addEventListener("click", function () {
      var csv = "RollNo,Student,Marks,Grade,Remarks\n" + payload().map(function (row) {
        var student = JGS_DATA.students.find(function (item) { return item.roll === row.roll; });
        return [row.roll, student.name, row.marks, row.grade, row.remarks].map(function (value) { return '"' + String(value).replace(/"/g, '""') + '"'; }).join(",");
      }).join("\n");
      var link = document.createElement("a");
      link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
      link.download = "jgs-gradebook.csv";
      link.click();
      URL.revokeObjectURL(link.href);
    });
    render();
  });
});
