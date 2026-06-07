document.addEventListener("DOMContentLoaded", function () {
  JGSApp.mount("Assignment Grading", "Dashboard > Assignment Grading", function (root) {
    var submissions = [
      { id: "sub-1", assignment: "DBMS ER Diagram", roll: "CSE301", student: "Aarav Nair", answer: "ER diagram includes Student, Course, Fee and Attendance entities.", fileName: "er-diagram.pdf", status: "Submitted" },
      { id: "sub-2", assignment: "DBMS ER Diagram", roll: "CSE302", student: "Sara Shaikh", answer: "Submitted normalization notes and ER model explanation.", fileName: "", status: "Submitted" },
      { id: "sub-3", assignment: "Digital Logic Worksheet", roll: "CSE304", student: "Meera Patil", answer: "Solved K-map and truth table worksheet.", fileName: "logic.xlsx", status: "Graded", marks: "18", feedback: "Very clean work." }
    ];
    var selected = submissions[0];
    root.innerHTML = '<section class="grid two"><div class="card"><div class="toolbar"><div class="field"><label>Assignment</label><select id="assignmentFilter"><option>DBMS ER Diagram</option><option>Digital Logic Worksheet</option></select></div><button class="button" id="bulkGrade">Bulk Grade 15</button></div><div id="submissionList" class="list"></div></div><div class="card"><h2 id="studentTitle">Submission</h2><div id="answerPanel" class="empty-state"></div><div class="form-grid"><div class="field"><label>Marks</label><input id="marks" type="number" min="0" max="100"></div><div class="field"><label>Feedback</label><textarea id="feedback" rows="5"></textarea></div><button class="button primary" id="submitGrade">Submit Grade</button></div></div></section>';
    function renderList() {
      var filter = document.getElementById("assignmentFilter").value;
      document.getElementById("submissionList").innerHTML = submissions.filter(function (item) { return item.assignment === filter; }).map(function (item) {
        return '<button class="item-row" data-submission="' + item.id + '"><span><strong>' + item.student + '</strong><div class="muted">' + item.roll + ' - ' + item.status + '</div></span><span class="status ' + (item.status === "Graded" ? "green" : "amber") + '">' + (item.marks || "Review") + '</span></button>';
      }).join("");
      document.querySelectorAll("[data-submission]").forEach(function (button) {
        button.addEventListener("click", function () {
          selected = submissions.find(function (item) { return item.id === button.dataset.submission; });
          renderSelected();
        });
      });
    }
    function renderSelected() {
      document.getElementById("studentTitle").textContent = selected.student + " - " + selected.assignment;
      document.getElementById("answerPanel").className = "";
      document.getElementById("answerPanel").innerHTML = '<p><strong>Answer:</strong></p><p>' + selected.answer + '</p><p class="muted">File: ' + (selected.fileName || "No file attached") + '</p>';
      document.getElementById("marks").value = selected.marks || "";
      document.getElementById("feedback").value = selected.feedback || "";
    }
    async function saveGrade(item, marks, feedback) {
      item.marks = String(marks);
      item.feedback = feedback;
      item.status = "Graded";
      await fetch((window.JGS_API_BASE || "").replace(/\/$/, "") + "/api/teacher/assignments/grade", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(localStorage.getItem("jgs_token") ? { Authorization: "Bearer " + localStorage.getItem("jgs_token") } : {})
        },
        body: JSON.stringify({ submissionId: item.id, marks, feedback })
      }).catch(console.warn);
    }
    document.getElementById("assignmentFilter").addEventListener("change", renderList);
    document.getElementById("submitGrade").addEventListener("click", async function () {
      if (!selected) return;
      await saveGrade(selected, document.getElementById("marks").value, document.getElementById("feedback").value);
      JGSApp.toast("Grade submitted for " + selected.student + ".");
      renderList();
      renderSelected();
    });
    document.getElementById("bulkGrade").addEventListener("click", async function () {
      var filter = document.getElementById("assignmentFilter").value;
      for (var item of submissions.filter(function (row) { return row.assignment === filter && row.status !== "Graded"; })) {
        await saveGrade(item, 15, "Approved in bulk grading.");
      }
      JGSApp.toast("Bulk grading completed.");
      renderList();
    });
    renderList();
    renderSelected();
  });
});
