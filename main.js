document.addEventListener("DOMContentLoaded", () => {
  // ====== ⏳ ĐỒNG HỒ ĐẾM NGƯỢC ======
  const countDownDate = new Date("August 20, 2025 10:00:00").getTime();

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

  // ====== 🎵 NHẠC NỀN & NÚT BẬT/TẮT ======
  const music = document.getElementById("bg-music");
  const btnMusic = document.getElementById("music-toggle");

  function updateMusicButton() {
    btnMusic.innerText = music.paused ? "Bật Nhạc nền" : "Tắt Nhạc nền";
  }

  btnMusic.addEventListener("click", () => {
    if (music.paused) {
      music.play();
    } else {
      music.pause();
    }
    updateMusicButton();
  });

  // Tự động phát nhạc khi trang mở (nếu được phép)
  music.play().then(() => {
    updateMusicButton();
  }).catch((err) => {
    console.warn("Tự động phát nhạc bị chặn:", err);
    updateMusicButton();

    // Thêm thông báo nhỏ nếu auto-play bị chặn
    const notice = document.createElement("div");
    notice.innerText = "🎵 Nhấn nút bên dưới để bật nhạc nền 🎵";
    notice.style.color = "#d81b60";
    notice.style.textAlign = "center";
    notice.style.margin = "10px 0";
    btnMusic.parentNode.insertBefore(notice, btnMusic);
  });
});
