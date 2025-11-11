const petalContainer = document.getElementById("petal-container");

function createPetal() {
  const petal = document.createElement("div");
  petal.classList.add("petal");
  petal.style.left = Math.random() * window.innerWidth + "px";
  petal.style.animationDuration = 5 + Math.random() * 10 + "s";
  petal.style.opacity = Math.random();
  petal.style.fontSize = 10 + Math.random() * 20 + "px";
  petalContainer.appendChild(petal);

  setTimeout(() => {
    petal.remove();
  }, 15000);
}

setInterval(createPetal, 300);

// Background music toggle
const musicToggle = document.getElementById("music-toggle");
const backgroundMusic = document.getElementById("background-music");

musicToggle.addEventListener("click", () => {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    musicToggle.textContent = "Pause Music 🎵";
  } else {
    pauseMusic();
  }
});

function pauseMusic() {
  backgroundMusic.pause();
  musicToggle.textContent = "Play Music 🎵";
}

document.addEventListener("focusout", (event) => {
  pauseMusic();
});

// Gallery lightbox scripts
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.querySelector(".lightbox .close");
const wishButton = document.querySelector("#wish-button");

const galleryThumbs = document.querySelectorAll(".gallery-thumb");
galleryThumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    lightboxImg.src = thumb.src;
    lightbox.style.display = "flex";
  });
});

lightboxClose.addEventListener("click", () => {
  lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

wishButton.addEventListener("click", (e) => {
  open('/wish')
});