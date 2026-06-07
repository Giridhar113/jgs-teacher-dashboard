document.addEventListener("DOMContentLoaded", function () {
  JGSApp.mount("PTM Bookings", "Dashboard > PTM Bookings", async function (root) {
    var fallback = [
      { date: "2026-06-08", time: "10:00 AM", teacher: "Prof. Asha Mehta", room: "CSE Block 204", status: "Booked", wardRoll: "JGS/CSE/2024/048" }
    ];
    var bookings = fallback;
    try {
      var response = await JGSApp.get("/api/teacher/ptm/bookings");
      if (response && response.ok && !response.staticMode) bookings = await response.json();
    } catch (error) {
      console.warn(error);
    }
    root.innerHTML = '<section class="card"><h2>Booked PTM Slots</h2><div class="table-wrap"><table><thead><tr><th>Date</th><th>Time</th><th>Parent/Ward</th><th>Room</th><th>Status</th></tr></thead><tbody>' + bookings.map(function (item) {
      return '<tr><td>' + item.date + '</td><td>' + item.time + '</td><td>' + (item.wardRoll || 'Parent booking') + '</td><td>' + item.room + '</td><td><span class="status green">' + item.status + '</span></td></tr>';
    }).join("") + '</tbody></table></div></section>';
  });
});
