const petalContainer = document.getElementById('petal-container');

function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    petal.style.left = Math.random() * window.innerWidth + 'px';
    petal.style.animationDuration = 5 + Math.random() * 10 + 's';
    petal.style.opacity = Math.random();
    petal.style.fontSize = 10 + Math.random() * 20 + 'px';
    petalContainer.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 15000);
}

setInterval(createPetal, 300);

// Background music toggle
const musicToggle = document.getElementById('music-toggle');
const backgroundMusic = document.getElementById('background-music');

musicToggle.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicToggle.textContent = 'Pause Music 🎵';
    } else {
        backgroundMusic.pause();
        musicToggle.textContent = 'Play Music 🎵';
    }
});

// Gallery lightbox scripts
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox .close');

const galleryThumbs = document.querySelectorAll('.gallery-thumb');
galleryThumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
        lightboxImg.src = thumb.src;
        lightbox.style.display = 'flex';
    });
});

lightboxClose.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', e => {
    if(e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

// Firepad guestbook embed
function loadFirepad() {
  const script1 = document.createElement('script');
  script1.src = 'https://www.gstatic.com/firebasejs/8.3.3/firebase-app.js';
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.src = 'https://www.gstatic.com/firebasejs/8.3.3/firebase-database.js';
  document.head.appendChild(script2);

  const script3 = document.createElement('script');
  script3.src = 'https://cdn.firebase.com/libs/firepad/1.5.10/firepad.min.js';
  document.head.appendChild(script3);

  script3.onload = () => {
    // Initialize Firebase - replace config below with your own
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
      databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_PROJECT_ID.appspot.com",
      messagingSenderId: "YOUR_SENDER_ID",
      appId: "YOUR_APP_ID"
    };
    firebase.initializeApp(firebaseConfig);

    const firepadRef = firebase.database().ref('weddingGuestbook');

    Firepad.fromDiv(firepadRef, document.getElementById('firepad-container'), {
      defaultText: 'Leave your precious wishes for Vikhyath & Vibha here...'
    });
  };
}

loadFirepad();