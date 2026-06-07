document.addEventListener("DOMContentLoaded", function () {
  JGSApp.mount("My Classes", "Dashboard > My Classes", function (root) {
    JGSApp.get("/api/faculty/students");
    root.innerHTML = '<section class="card"><div class="toolbar"><div class="field"><label>Subject</label><select><option>Data Structures</option><option>DBMS</option><option>Python Lab</option></select></div><div class="field"><label>Class</label><select><option>CSE Sem 3 Sec A</option><option>CSE Sem 3 Sec B</option><option>CSE Sem 3 Lab Batch</option></select></div></div><div class="table-wrap"><table><thead><tr><th>Roll No</th><th>Name</th><th>Attendance %</th><th>Latest Marks</th><th>Fee Risk</th><th>Parent Contact</th><th>Actions</th></tr></thead><tbody>' + JGS_DATA.students.map(function (student) {
      return '<tr><td>' + student.roll + '</td><td>' + student.name + '</td><td>' + student.attendance + '%</td><td>' + student.marks + '</td><td><span class="status ' + JGSApp.statusClass(student.feeRisk) + '">' + student.feeRisk + '</span></td><td><a href="tel:' + student.parent.replace(/\s/g, "") + '">' + student.parent + '</a></td><td><div class="actions"><button class="button">View Student</button><a class="button" href="parent-messages.html">Message Parent</a><button class="button">Flag for Counseling</button><a class="button primary" href="attendance.html">Mark Attendance</a></div></td></tr>';
    }).join("") + '</tbody></table></div></section>';
  });
});
