document.addEventListener("DOMContentLoaded", function () {
  JGSApp.mount("My Timetable", "Dashboard > My Timetable", function (root) {
    var head = '<div class="time-slot">Time</div>' + JGS_DATA.timetable.days.map(function (day) { return '<div class="time-slot">' + day + '</div>'; }).join("");
    var body = JGS_DATA.timetable.slots.map(function (slot, row) {
      return '<div class="time-slot">' + slot + '</div>' + JGS_DATA.timetable.days.map(function (_, col) {
        var text = (JGS_DATA.timetable.cells[row] && JGS_DATA.timetable.cells[row][col]) || "Office Hour<br>Faculty Room";
        return '<div class="day-cell"><strong>' + text.split("<br>")[0] + '</strong><span class="muted">' + text.split("<br>").slice(1).join("<br>") + '</span></div>';
      }).join("");
    }).join("");
    root.innerHTML = '<section class="card"><h2>Weekly Timetable</h2><div class="timetable">' + head + body + '</div><div class="card" style="margin-top:16px"><h2>Substitute Class Assignments</h2><div class="list"><div class="item-row"><strong>Wednesday 13:00</strong><span class="muted">Operating Systems - CSE Sem 3 - Room 303</span></div><div class="item-row"><strong>Friday 15:00</strong><span class="muted">Computer Networks - CSE Sem 4 - Room 306</span></div></div></div></section>';
  });
});
