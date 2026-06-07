document.addEventListener("DOMContentLoaded", function () {
  JGSApp.mount("Class Analytics", "Dashboard > Class Analytics", function (root) {
    var ranges = [0, 0, 0, 0, 0];
    JGS_DATA.students.forEach(function (student) {
      if (student.marks >= 85) ranges[0] += 1;
      else if (student.marks >= 70) ranges[1] += 1;
      else if (student.marks >= 55) ranges[2] += 1;
      else if (student.marks >= 40) ranges[3] += 1;
      else ranges[4] += 1;
    });
    var sorted = JGS_DATA.students.slice().sort(function (a, b) { return b.marks - a.marks; });
    var lowAttendance = JGS_DATA.students.filter(function (student) { return student.attendance < 75; });
    var heat = Array.from({ length: 24 }, function (_, index) {
      var present = 68 + ((index * 7) % 31);
      return { day: index + 1, present };
    });
    root.innerHTML = '<section class="grid four"><article class="card"><h2>Class Average</h2><div class="metric">' + Math.round(JGS_DATA.students.reduce(function (sum, s) { return sum + s.marks; }, 0) / JGS_DATA.students.length) + '%</div><p class="muted">Subject: DBMS</p></article><article class="card"><h2>Below 75%</h2><div class="metric red-text">' + lowAttendance.length + '</div><p class="muted">Auto-highlighted attendance risks</p></article><article class="card"><h2>Top Score</h2><div class="metric">' + sorted[0].marks + '%</div><p class="muted">' + sorted[0].name + '</p></article><article class="card"><h2>Lowest Score</h2><div class="metric red-text">' + sorted.at(-1).marks + '%</div><p class="muted">' + sorted.at(-1).name + '</p></article></section><section class="grid two" style="margin-top:18px"><article class="card chart-card"><h2>Marks Distribution</h2><canvas id="marksDistribution"></canvas></article><article class="card"><h2>Attendance Heatmap</h2><div class="heatmap">' + heat.map(function (item) { return '<span class="heat-cell heat-' + (item.present >= 90 ? 'high' : item.present >= 75 ? 'mid' : 'low') + '" title="Day ' + item.day + ': ' + item.present + '%">' + item.day + '</span>'; }).join("") + '</div></article></section><section class="grid two" style="margin-top:18px"><article class="card"><h2>Top 5 Performers</h2><div class="list">' + sorted.slice(0, 5).map(function (s) { return '<div class="item-row"><span>' + s.name + '</span><strong>' + s.marks + '%</strong></div>'; }).join("") + '</div></article><article class="card"><h2>Bottom 5 Alert List</h2><div class="list">' + sorted.slice(-5).reverse().map(function (s) { return '<div class="item-row alert-row"><span>' + s.name + '</span><strong>' + s.marks + '%</strong></div>'; }).join("") + '</div></article></section><section class="card" style="margin-top:18px"><h2>Students Below 75% Attendance</h2><div class="list">' + lowAttendance.map(function (s) { return '<div class="item-row alert-row"><span><strong>' + s.name + '</strong><div class="muted">' + s.roll + '</div></span><span class="status red">' + s.attendance + '%</span></div>'; }).join("") + '</div></section>';
    new Chart(document.getElementById("marksDistribution"), {
      type: "bar",
      data: { labels: ["85+", "70-84", "55-69", "40-54", "<40"], datasets: [{ label: "Students", data: ranges, backgroundColor: ["#16a34a", "#2563eb", "#f59e0b", "#f97316", "#dc2626"] }] },
      options: { responsive: true, maintainAspectRatio: false }
    });
  });
});
