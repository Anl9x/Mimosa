// --- Cấu hình ngày giờ cưới ---
// Định dạng "dd/mm/yyyy hh:mm" => bạn sửa ngày giờ cưới ở đây thôi
const weddingDateTimeStr = "15/07/2026 10:00"; 
const [datePart, timePart] = weddingDateTimeStr.split(" ");
const [day, month, year] = datePart.split("/").map(Number);
const [hour, minute] = timePart.split(":").map(Number);

const weddingDateTime = new Date(year, month - 1, day, hour, minute, 0);

// Cập nhật phần text ngày giờ cưới phía trên
document.getElementById("wedding-time").textContent = `${hour}:${minute.toString().padStart(2,'0')} sáng`;
document.getElementById("wedding-date").textContent = `${day.toString().padStart(2,'0')}/${month.toString().padStart(2,'0')}/${year}`;

// Đồng hồ đếm ngược
const countDownDate = weddingDateTime.getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown() {
  const now = new Date().getTime();
  const distance = countDownDate - now;

  if (distance < 0) {
    document.getElementById("timer").innerHTML = "Hôn lễ đã diễn ra!";
    clearInterval(interval);
    return;
  }

  daysEl.innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
  hoursEl.innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  minutesEl.innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  secondsEl.innerText = Math.floor((distance % (1000 * 60)) / 1000);
}

const interval = setInterval(updateCountdown, 1000);
updateCountdown();

// --- Tự động tạo lịch và highlight ngày cưới ---
function createCalendar(year, month, highlightDay) {
  const calendarContainer = document.getElementById("calendar-container");
  calendarContainer.innerHTML = ""; // Xóa lịch cũ

  const monthNames = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
  ];

  // Tạo tiêu đề tháng
  const heading = document.createElement("h3");
  heading.textContent = `${monthNames[month]} ${year}`;
  calendarContainer.appendChild(heading);

  // Tạo bảng lịch
  const table = document.createElement("table");

  // Tạo phần đầu bảng (thứ trong tuần)
  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");
  const weekDays = ["CN","T2","T3","T4","T5","T6","T7"];
  weekDays.forEach(dayName => {
    const th = document.createElement("th");
    th.textContent = dayName;
    headRow.appendChild(th);
  });
  thead.appendChild(headRow);
  table.appendChild(thead);

  // Tạo phần thân bảng (ngày)
  const tbody = document.createElement("tbody");

  // Ngày đầu tháng là ngày trong tuần thứ mấy (0=CN,...)
  const firstDay = new Date(year, month, 1).getDay();

  // Số ngày trong tháng
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let date = 1;

  for(let i=0; i<6; i++) { // tối đa 6 hàng tuần
    const tr = document.createElement("tr");

    for(let j=0; j<7; j++) {
      const td = document.createElement("td");

      if(i === 0 && j < firstDay) {
        td.textContent = "";
      } else if(date > daysInMonth) {
        td.textContent = "";
      } else {
        td.textContent = date;
        if(date === highlightDay) {
          td.classList.add("highlight");
        }
        date++;
      }

      tr.appendChild(td);
    }

    tbody.appendChild(tr);

    if(date > daysInMonth) break;
  }

  table.appendChild(tbody);
  calendarContainer.appendChild(table);
}

// Tạo lịch tháng năm dựa trên ngày cưới
createCalendar(year, month - 1, day);

// --- Nhạc nền bật tắt ---
const music = document.getElementById("bg-music");
const btnMusic = document.getElementById("music-toggle");

btnMusic.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    btnMusic.innerText = "Tắt Nhạc nền";
  } else {
    music.pause();
    btnMusic.innerText = "Bật Nhạc nền";
  }
});

window.addEventListener("load", () => {
  music.play().then(() => {
    btnMusic.innerText = "Tắt Nhạc nền";
  }).catch(() => {
    // Trình duyệt chặn auto-play
  });
});
