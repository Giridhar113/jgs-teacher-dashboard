document.addEventListener("DOMContentLoaded", function () {
  JGSApp.mount("Bulk Attendance Import", "Dashboard > Bulk Attendance", function (root) {
    var parsedRows = [];
    root.innerHTML = '<section class="grid two"><article class="card"><h2>CSV Upload</h2><p class="muted">Columns: RollNo, Date, Status</p><div class="actions"><button class="button" id="template">Download CSV Template</button><label class="button primary">Upload CSV<input id="csvFile" type="file" accept=".csv" hidden></label></div><p class="muted" id="parseStatus">Upload a CSV to preview records before saving.</p></article><article class="card"><h2>Rules</h2><div class="tracker"><div class="tracker-step done"><span class="tracker-dot"></span><span>Status must be Present or Absent</span></div><div class="tracker-step done"><span class="tracker-dot"></span><span>Date should use YYYY-MM-DD</span></div><div class="tracker-step active"><span class="tracker-dot"></span><span>Confirm only after preview check</span></div></div></article></section><section class="card" style="margin-top:18px"><div class="item-row"><div><h2>Preview</h2><p class="muted">Parsed attendance rows</p></div><button class="button green" id="confirm" disabled>Confirm Import</button></div><div id="preview" class="empty-state">No CSV parsed yet.</div></section>';

    function renderPreview() {
      if (!parsedRows.length) {
        document.getElementById("preview").innerHTML = "No CSV parsed yet.";
        document.getElementById("preview").className = "empty-state";
        document.getElementById("confirm").disabled = true;
        return;
      }
      document.getElementById("preview").className = "table-wrap";
      document.getElementById("preview").innerHTML = '<table><thead><tr><th>RollNo</th><th>Date</th><th>Status</th></tr></thead><tbody>' + parsedRows.map(function (row) {
        return '<tr><td>' + (row.RollNo || "") + '</td><td>' + (row.Date || "") + '</td><td><span class="status ' + (String(row.Status).toLowerCase() === "present" ? "green" : "red") + '">' + (row.Status || "") + '</span></td></tr>';
      }).join("") + '</tbody></table>';
      document.getElementById("confirm").disabled = false;
    }

    document.getElementById("template").addEventListener("click", function () {
      var csv = "RollNo,Date,Status\nCSE301,2026-06-04,Present\nCSE302,2026-06-04,Absent\n";
      var link = document.createElement("a");
      link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
      link.download = "jgs-attendance-template.csv";
      link.click();
      URL.revokeObjectURL(link.href);
    });

    document.getElementById("csvFile").addEventListener("change", function (event) {
      var file = event.target.files[0];
      if (!file) return;
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (result) {
          parsedRows = result.data.filter(function (row) { return row.RollNo && row.Date && row.Status; });
          document.getElementById("parseStatus").textContent = parsedRows.length + " records parsed.";
          renderPreview();
        }
      });
    });

    document.getElementById("confirm").addEventListener("click", async function () {
      var response = await JGSApp.post("/api/teacher/attendance/bulk", { records: parsedRows });
      var count = parsedRows.length;
      if (response && response.ok && !response.staticMode) {
        var payload = await response.json();
        count = payload.count || count;
      }
      JGSApp.toast(count + " attendance records saved.");
    });
  });
});
