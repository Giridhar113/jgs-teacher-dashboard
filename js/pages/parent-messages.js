document.addEventListener("DOMContentLoaded", function () {
  JGSApp.mount("Parent Messages", "Dashboard > Parent Messages", function (root) {
    JGSApp.get("/api/messages");
    root.innerHTML = '<section class="grid two"><div class="card"><h2>Inbox</h2><div id="inbox" class="list"></div></div><div class="card"><h2 id="threadTitle">Select a message</h2><div id="history" class="list empty-state">Choose a parent conversation to view message history.</div><div class="field" style="margin-top:14px"><label>Reply</label><textarea id="reply" placeholder="Write a portal reply"></textarea></div><div class="actions" style="margin-top:10px"><button class="button primary" id="send">Send via Portal</button><a class="button green" id="whatsapp" href="#" target="_blank" rel="noopener">Open WhatsApp</a></div></div></section>';
    var selected = null;
    var inbox = document.getElementById("inbox");
    var threadTitle = document.getElementById("threadTitle");
    var history = document.getElementById("history");
    var reply = document.getElementById("reply");
    var send = document.getElementById("send");
    var whatsapp = document.getElementById("whatsapp");
    function select(index) {
      selected = JGS_DATA.messages[index];
      threadTitle.textContent = selected.parent + " - " + selected.student;
      history.className = "list";
      history.innerHTML = selected.history.map(function (line) { return '<div class="item-row"><span>' + line + '</span></div>'; }).join("");
      whatsapp.href = "https://wa.me/919000010001?text=" + encodeURIComponent("Hello, this is Prof. Asha Mehta from JGS regarding " + selected.student + ".");
    }
    inbox.innerHTML = JGS_DATA.messages.map(function (msg, index) {
      return '<button class="item-row" data-index="' + index + '"><span><strong>' + msg.parent + '</strong><div class="muted">' + msg.student + ' - ' + msg.preview + '</div></span><span class="status blue">Reply</span></button>';
    }).join("");
    document.querySelectorAll("[data-index]").forEach(function (button) {
      button.addEventListener("click", function () { select(button.dataset.index); });
    });
    send.addEventListener("click", async function () {
      if (!selected || !reply.value.trim()) {
        JGSApp.toast("Select a message and write a reply first.");
        return;
      }
      selected.history.push(reply.value.trim());
      await JGSApp.post("/api/messages", { student: selected.student, parent: selected.parent, message: reply.value.trim() });
      reply.value = "";
      select(JGS_DATA.messages.indexOf(selected));
      JGSApp.toast("Reply sent via portal.");
    });
  });
});
