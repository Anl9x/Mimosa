// === Ngày cưới định dạng Việt Nam: "15/07/2026" ===
const weddingVNDate = "15/07/2026";

// Hàm chuyển đổi chuỗi "dd/mm/yyyy" thành đối tượng Date chuẩn JS
function parseVNDate(dateStr) {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
}

const weddingDate = parseVNDate(weddingVNDate);
const countDownDate = weddingDate.getTime();

// DOM elements cho đồng hồ đếm ngược
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

// Cập nhật đồng hồ đếm ngược
function updateCountdown() {
  const now = Date.now();
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

// Nhạc nền bật tắt
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

// Tự động phát nhạc khi tải trang (nếu trình duyệt cho phép)
window.addEventListener("load", () => {
  music.play().then(() => {
    btnMusic.innerText = "Tắt Nhạc nền";
  }).catch(() => {
    // Nếu trình duyệt chặn auto-play, user sẽ phải bấm nút
  });
});

// Hàm tạo bảng lịch tháng có đánh dấu ngày cưới
function generateWeddingCalendar(date) {
  const calendarDiv = document.querySelector(".calendar");
  if (!calendarDiv) return;

  const year = date.getFullYear();
  const month = date.getMonth(); // 0-based
  const day = date.getDate();

  // Tiêu đề tháng năm
  const monthNames = ["01","02","03","04","05","06","07","08","09","10","11","12"];
  calendarDiv.querySelector("h3").innerText = `Lịch Tháng ${monthNames[month]}/${year}`;

  // Tính ngày đầu tháng là thứ mấy (0: CN, 1: T2,...)
  const firstDay = new Date(year, month, 1).getDay();

  // Số ngày trong tháng
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Tạo mảng các ngày (với ô trống đầu nếu firstDay > 0)
  const weeks = [];
  let week = [];

  // Thêm ô trống đầu tiên cho các ngày trước ngày 1 tháng
  for (let i = 0; i < firstDay; i++) {
    week.push("");
  }

  for (let dateNum = 1; dateNum <= daysInMonth; dateNum++) {
    week.push(dateNum);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  // Thêm các ô trống cuối cùng nếu cần
  if (week.length > 0) {
    while (week.length < 7) {
      week.push("");
    }
    weeks.push(week);
  }

  // Tạo tbody bảng
  const tbody = calendarDiv.querySelector("tbody");
  tbody.innerHTML = ""; // xóa trước

  weeks.forEach(weekArr => {
    const tr = document.createElement("tr");
    weekArr.forEach(dateNum => {
      const td = document.createElement("td");
      if (dateNum === "") {
        td.textContent = "";
      } else {
        td.textContent = dateNum;
        if (dateNum === day) {
          td.classList.add("highlight");
        }
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

// Gọi hàm tạo lịch với ngày cưới đã định nghĩa
generateWeddingCalendar(weddingDate);
