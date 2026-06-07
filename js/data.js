window.JGS_DATA = {
  faculty: {
    name: "Prof. Asha Mehta",
    shortName: "Prof. Mehta",
    department: "CSE",
    designation: "Assistant Professor",
    id: "FAC/CSE/042",
    teaches: ["Data Structures", "DBMS", "Python Lab"],
    assignedClass: "B.Tech CSE Semester 3",
    email: "asha.mehta@jgs.edu.in",
    phone: "+91 98765 42042"
  },
  kpis: [
    ["Today's Classes", "4", "blue"],
    ["Pending Attendance", "2", "amber"],
    ["Parent Messages", "3", "blue"],
    ["Marks Due", "1", "red"]
  ],
  schedule: [
    { time: "08:30", subject: "Data Structures", className: "CSE Sem 3 Sec A", room: "Room 301", students: 48 },
    { time: "10:30", subject: "DBMS", className: "CSE Sem 3 Sec B", room: "Room 302", students: 46 },
    { time: "13:00", subject: "Python Lab", className: "CSE Sem 3", room: "Lab 2", students: 24 },
    { time: "15:00", subject: "Data Structures", className: "CSE Sem 4", room: "Room 305", students: 44 }
  ],
  tasks: [
    { title: "Upload mid-term marks", subject: "Data Structures", due: "30 May", status: "Pending" },
    { title: "Submit lesson plan", subject: "DBMS", due: "31 May", status: "Attention" }
  ],
  messages: [
    {
      parent: "Mrs. Nair",
      student: "Aarav Nair",
      preview: "Requesting an update on DBMS internal preparation.",
      history: ["Please share his recent DBMS performance.", "Will send a brief update after today's lab review."]
    },
    {
      parent: "Mr. Shaikh",
      student: "Sara Shaikh",
      preview: "Sara will miss Python Lab for medical appointment.",
      history: ["Sara has an appointment tomorrow.", "Noted. She can complete the lab worksheet by Friday."]
    },
    {
      parent: "Mrs. Iyer",
      student: "Rohan Iyer",
      preview: "Needs guidance on attendance shortage.",
      history: ["Rohan is concerned about attendance.", "Please ask him to meet after the 10:30 lecture."]
    }
  ],
  students: [
    { roll: "CSE301", name: "Aarav Nair", attendance: 92, marks: 78, feeRisk: "Low", parent: "+91 90000 10001" },
    { roll: "CSE302", name: "Sara Shaikh", attendance: 86, marks: 81, feeRisk: "Low", parent: "+91 90000 10002" },
    { roll: "CSE303", name: "Rohan Iyer", attendance: 68, marks: 54, feeRisk: "Medium", parent: "+91 90000 10003" },
    { roll: "CSE304", name: "Meera Patil", attendance: 95, marks: 88, feeRisk: "Low", parent: "+91 90000 10004" },
    { roll: "CSE305", name: "Kabir Khan", attendance: 74, marks: 63, feeRisk: "High", parent: "+91 90000 10005" },
    { roll: "CSE306", name: "Ananya Das", attendance: 89, marks: 72, feeRisk: "Low", parent: "+91 90000 10006" }
  ],
  notices: [
    { title: "DBMS Lab Viva", target: "CSE Sem 3 Sec B", priority: "High", expires: "2026-06-07", reads: 39 },
    { title: "Data Structures Assignment", target: "CSE Sem 3 Sec A", priority: "Normal", expires: "2026-06-05", reads: 44 }
  ],
  timetable: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    slots: ["08:30", "10:30", "13:00", "15:00"],
    cells: [
      ["Data Structures<br>CSE Sem 3 A<br>Room 301", "DBMS<br>CSE Sem 3 B<br>Room 302", "Python Lab<br>CSE Sem 3<br>Lab 2", "Mentoring<br>CSE Sem 3<br>Room 204", "Data Structures<br>CSE Sem 4<br>Room 305"],
      ["DBMS<br>CSE Sem 3 B<br>Room 302", "Data Structures<br>CSE Sem 3 A<br>Room 301", "Substitute: OS<br>CSE Sem 3<br>Room 303", "Python Lab<br>CSE Sem 3<br>Lab 2", "Lesson Plan<br>Faculty Room"],
      ["Python Lab<br>CSE Sem 3<br>Lab 2", "DBMS Tutorial<br>CSE Sem 3 B<br>Room 302", "Data Structures<br>CSE Sem 4<br>Room 305", "Library Hour<br>CSE Sem 3", "Project Guidance<br>Lab 1"],
      ["Data Structures<br>CSE Sem 3 A<br>Room 301", "Parent Call Slot<br>Faculty Room", "Python Lab<br>CSE Sem 3<br>Lab 2", "DBMS<br>CSE Sem 3 B<br>Room 302", "Substitute: CN<br>CSE Sem 4<br>Room 306"]
    ]
  },
  payslips: [
    { month: "May 2026", status: "Available" },
    { month: "April 2026", status: "Available" },
    { month: "March 2026", status: "Available" }
  ]
};
