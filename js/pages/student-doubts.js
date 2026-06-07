document.addEventListener("DOMContentLoaded", function () {
  JGSApp.mount("Student Doubts", "Dashboard > Student Doubts", function (root) {
    var fallback = [
      {
        _id: "demo-doubt-1",
        subject: "Database Systems",
        question: "How do I identify partial dependency?",
        studentId: { name: "Priya Sharma", rollNumber: "JGS/CSE/2024/048" },
        status: "Pending"
      }
    ];
    var selected = null;

    root.innerHTML = '<section class="grid two"><div class="card"><h2>Subject-wise Doubts</h2><div id="doubtList" class="list"></div></div><div class="card"><h2 id="doubtTitle">Select a doubt</h2><div id="doubtQuestion" class="empty-state">Choose a student doubt to reply.</div><div class="field" style="margin-top:14px"><label>Teacher Reply</label><textarea id="replyText" placeholder="Write a clear answer for the student"></textarea></div><div class="actions" style="margin-top:10px"><button class="button primary" id="sendReply">Send Reply</button></div></div></section>';

    var list = document.getElementById("doubtList");
    var title = document.getElementById("doubtTitle");
    var question = document.getElementById("doubtQuestion");
    var reply = document.getElementById("replyText");

    function render(items) {
      list.innerHTML = items.map(function (item, index) {
        var student = item.studentId && item.studentId.name ? item.studentId.name : "Student";
        return '<button class="item-row" data-index="' + index + '"><span><strong>' + item.subject + '</strong><div class="muted">' + student + ' - ' + item.question + '</div></span><span class="status ' + (item.status === "Replied" ? "green" : "amber") + '">' + item.status + '</span></button>';
      }).join("");
      document.querySelectorAll("[data-index]").forEach(function (button) {
        button.addEventListener("click", function () {
          selected = items[Number(button.dataset.index)];
          var student = selected.studentId && selected.studentId.name ? selected.studentId.name : "Student";
          var roll = selected.studentId && selected.studentId.rollNumber ? selected.studentId.rollNumber : "";
          title.textContent = selected.subject + " - " + student;
          question.className = "list";
          question.innerHTML = '<div class="item-row"><span><strong>' + selected.question + '</strong><div class="muted">' + roll + '</div></span></div>';
          reply.value = selected.reply || "";
        });
      });
    }

    async function load() {
      try {
        var response = await JGSApp.get("/api/teacher/doubts");
        if (response && response.ok && !response.staticMode) {
          render(await response.json());
          return;
        }
      } catch (error) {
        console.warn("Using static doubts:", error);
      }
      render(fallback);
    }

    document.getElementById("sendReply").addEventListener("click", async function () {
      if (!selected || !reply.value.trim()) {
        JGSApp.toast("Select a doubt and write a reply first.");
        return;
      }
      try {
        await JGSApp.post("/api/teacher/doubts/" + selected._id + "/reply", { reply: reply.value.trim() });
      } catch (error) {
        console.warn(error);
      }
      selected.reply = reply.value.trim();
      selected.status = "Replied";
      JGSApp.toast("Reply sent to student thread.");
      load();
    });

    load();
  });
});
