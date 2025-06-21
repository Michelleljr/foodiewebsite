// --- Consolidated main.js content ---

document.addEventListener("DOMContentLoaded", function() {

    // --- Countdown Logic ---
    const flightDate = new Date("2025-12-12T08:40:00+02:00").getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const destinationTextEl = document.querySelector('.destination-text');

    function updateCountdown() {
        const now = new Date().getTime(); // Current time
        const distance = flightDate - now; // Time difference in milliseconds

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (daysEl) daysEl.textContent = days < 10 ? '0' + days : days;
        if (hoursEl) hoursEl.textContent = hours < 10 ? '0' + hours : hours;
        if (minutesEl) minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
        if (secondsEl) secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;

        if (distance < 0) {
            clearInterval(countdownInterval);
            if (daysEl) daysEl.textContent = '00';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
            if (destinationTextEl) {
                destinationTextEl.textContent = "I'm home!";
                destinationTextEl.style.color = '#FFAECC';
            }
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call to display countdown immediately


    // --- GSAP Scroll Animations ---
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Entrance
    gsap.from(".hero-section", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out", // Smooth easing
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top bottom-=10%", // Start when 90% of section is visible
            toggleActions: "play none none none", // Play once on scroll in
            // markers: true, // for debugging scroll triggers
        }
    });

    // Food Section Entrance
    gsap.from(".food-section", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2, // Slight delay
        scrollTrigger: {
            trigger: ".food-section",
            start: "top bottom-=10%",
            toggleActions: "play none none none",
            // markers: true, // for debugging
        }
    });

    // Individual Food Card Staggered Entrance
    gsap.from(".food-item-card", {
        opacity: 0,
        y: 30,
        stagger: 0.1, // Stagger animation by 0.1 seconds per card
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".food-grid", // Trigger when the grid comes into view
            start: "top bottom-=15%",
            toggleActions: "play none none none",
            // markers: true, // Uncomment for debugging scroll triggers
        }
    });

    // Food Image Slide-in Animation (THIS IS THE MISSING PART YOU NEED!)
    gsap.utils.toArray(".food-item-card").forEach(card => {
        gsap.to(card.querySelector(".food-image"), {
            x: "0%", // Animate back to its original horizontal position
            opacity: 1, // Fade in
            duration: 1.2, // A bit longer duration for a smooth slide
            ease: "power3.out", // Smooth deceleration
            scrollTrigger: {
                trigger: card, // Each individual card is the trigger
                start: "top 85%", // When the top of the card is 85% down the viewport
                toggleActions: "play none none none", // Play once when scrolling in
                // markers: true, // Uncomment for debugging scroll triggers
            }
        });
    });

});