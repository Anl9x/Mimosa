// Nhạc nền
const music = document.getElementById('bg-music');
const toggleBtn = document.getElementById('music-toggle');

toggleBtn.addEventListener('click', () => {
  if (music.paused) {
    music.play();
    toggleBtn.innerText = 'Tắt nhạc';
  } else {
    music.pause();
    toggleBtn.innerText = 'Bật nhạc';
  }
});

// Đếm ngược
const countdown = document.getElementById('countdown');
const targetDate = new Date("March 15, 2026 10:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff <= 0) {
    countdown.innerHTML = "Hôn lễ đang diễn ra!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdown.innerHTML = `Còn ${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
}

setInterval(updateCountdown, 1000);
