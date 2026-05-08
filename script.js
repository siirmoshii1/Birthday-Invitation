// Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    
    const flipBookEl = document.getElementById('flipbook');
    flipBookEl.style.display = 'block'; 

    const pageFlip = new St.PageFlip(flipBookEl, {
        width: 450, // Base page width
        height: 650, // Base page height
        size: 'stretch', // Stretch to fit the container while maintaining aspect ratio
        minWidth: 315,
        maxWidth: 500,
        minHeight: 420,
        maxHeight: 700,
        drawShadow: true, // Shadows on page turn
        showCover: true, // Hardcover effects
        usePortrait: true, // Single page on mobile
        startPage: 0,
        autoSize: true,
        maxShadowOpacity: 0.6,
        flippingTime: 1200, // Slightly slower for an elegant feel
        swipeDistance: 30,
        showPageCorners: true,
        disableFlipByClick: false
    });

    // Load pages from the DOM
    pageFlip.loadFromHTML(document.querySelectorAll('.page'));

    // Hide Swipe Helper when user flips a page
    pageFlip.on('flip', (e) => {
        const swipeHelper = document.getElementById('swipeHelper');
        if (swipeHelper && swipeHelper.classList.contains('show')) {
            swipeHelper.classList.remove('show');
        }
    });

    // Countdown Timer Logic
    const countDownDate = new Date("May 14, 2026 18:00:00").getTime();
    const timerInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        if (distance < 0) {
            clearInterval(timerInterval);
            const cd = document.getElementById("countdown");
            if (cd) cd.innerHTML = "<div style='font-size: 1.5rem; color: var(--rose-gold);'>It's Time!</div>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (document.getElementById("cd-days")) {
            document.getElementById("cd-days").innerText = days.toString().padStart(2, '0');
            document.getElementById("cd-hours").innerText = hours.toString().padStart(2, '0');
            document.getElementById("cd-mins").innerText = minutes.toString().padStart(2, '0');
            document.getElementById("cd-secs").innerText = seconds.toString().padStart(2, '0');
        }
    }, 1000);

    // Modal Logic
    const welcomeModal = document.getElementById('welcomeModal');
    const openBtn = document.getElementById('openInvitationBtn');

    if (openBtn) {
        openBtn.addEventListener('click', () => {
            // Add amazing fade out & scale transition
            welcomeModal.classList.add('fade-out');

            // Play background music automatically upon opening
            if (!isPlaying) {
                bgMusic.play().then(() => {
                    audioToggle.classList.add('playing');
                    isPlaying = true;
                }).catch(error => {
                    console.log("Audio play failed:", error);
                });
            }

            // Show Swipe Helper
            const swipeHelper = document.getElementById('swipeHelper');
            if (swipeHelper) {
                swipeHelper.classList.add('show');
                // Auto hide after 4.5 seconds
                setTimeout(() => {
                    swipeHelper.classList.remove('show');
                }, 4500);
            }
        });
    }

    // Audio Logic
    const audioToggle = document.getElementById('audioToggle');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;

    // Set volume a bit lower so it's not abrasive
    bgMusic.volume = 0.4;

    audioToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            audioToggle.classList.remove('playing');
        } else {
            bgMusic.play().then(() => {
                audioToggle.classList.add('playing');
            }).catch(error => {
                console.log("Audio play failed, user might need to interact first:", error);
            });
        }
        isPlaying = !isPlaying;
    });
});
