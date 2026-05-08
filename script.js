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
