// Đồng hồ đếm ngược
const countDownDate = new Date("December 15, 2026 10:00:00").getTime();

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
    // Nếu trình duyệt chặn auto-play, sẽ không báo lỗi, user phải bấm nút
  });
});
