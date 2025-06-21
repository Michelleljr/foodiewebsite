
document.addEventListener("DOMContentLoaded", function() {

    // --- Countdown Logic ---
    const flightDate = new Date("2025-12-12T08:40:00+02:00").getTime(); // Use this, or "2025-12-12T06:40:00Z"

    // CORRECTED ELEMENT SELECTIONS: All must be defined
    const daysHundredsEl = document.getElementById('days-hundreds'); // THIS WAS THE MISSING ONE!
    const daysTensEl = document.getElementById('days-tens');
    const daysUnitsEl = document.getElementById('days-units');
    const hoursTensEl = document.getElementById('hours-tens');
    const hoursUnitsEl = document.getElementById('hours-units');
    const minutesTensEl = document.getElementById('minutes-tens');
    const minutesUnitsEl = document.getElementById('minutes-units');
    const secondsTensEl = document.getElementById('seconds-tens');
    const secondsUnitsEl = document.getElementById('seconds-units');

    const destinationTextEl = document.querySelector('.destination-text');

    // Helper function for the flipping animation of a SINGLE digit
    function animateSingleDigitFlip(element, newValue) {
        const oldValue = element.textContent;
        if (oldValue === newValue) return; // Only animate if value actually changes

        gsap.to(element, {
            rotationX: 90,
            duration: 0.25,
            ease: "power2.in",
            onComplete: () => {
                element.textContent = newValue; // Update content AFTER it has flipped out
                gsap.set(element, { rotationX: -90 }); // Snap to new start position (rotated back)
                gsap.to(element, { rotationX: 0, duration: 0.25, ease: "power2.out" }); // Animate in
            }
        });
    }

    // Main update countdown function
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = flightDate - now;

        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
            days = hours = minutes = seconds = 0;
            clearInterval(countdownInterval);
            if (destinationTextEl) {
                destinationTextEl.textContent = "I'm home!";
                destinationTextEl.style.color = '#FFAECC';
            }
        }

        // Helper to format numbers with leading zeros to a specific length
        const formatDigits = (num, length) => {
            let str = String(num);
            while (str.length < length) {
                str = '0' + str;
            }
            return str;
        };

        const currentDays = formatDigits(days, 3); // Days always 3 digits (e.g., "000", "174")
        const currentHours = formatDigits(hours, 2); // Hours always 2 digits (e.g., "09", "12")
        const currentMinutes = formatDigits(minutes, 2);
        const currentSeconds = formatDigits(seconds, 2);

        // Animate each digit only if its value has changed
        animateSingleDigitFlip(daysHundredsEl, currentDays[0]);
        animateSingleDigitFlip(daysTensEl, currentDays[1]);
        animateSingleDigitFlip(daysUnitsEl, currentDays[2]);

        animateSingleDigitFlip(hoursTensEl, currentHours[0]);
        animateSingleDigitFlip(hoursUnitsEl, currentHours[1]);

        animateSingleDigitFlip(minutesTensEl, currentMinutes[0]);
        animateSingleDigitFlip(minutesUnitsEl, currentMinutes[1]);

        animateSingleDigitFlip(secondsTensEl, currentSeconds[0]);
        animateSingleDigitFlip(secondsUnitsEl, currentSeconds[1]);
    }

    // Initial call to display countdown immediately
    updateCountdown();

    // Set interval for ongoing updates
    const countdownInterval = setInterval(updateCountdown, 1000);


    // --- GSAP Scroll Animations (KEEP THESE AS THEY ARE) ---
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Entrance
    gsap.from(".hero-section", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top bottom-=10%",
            toggleActions: "play none none none",
            // markers: true,
        }
    });

    // Food Section Entrance
    gsap.from(".food-section", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: {
            trigger: ".food-section",
            start: "top bottom-=10%",
            toggleActions: "play none none none",
            // markers: true,
        }
    });

    // Individual Food Card Staggered Entrance
    gsap.from(".food-item-card", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".food-grid",
            start: "top bottom-=15%",
            toggleActions: "play none none none",
            // markers: true,
        }
    });

    // Food Image Slide-in Animation
    gsap.utils.toArray(".food-item-card").forEach(card => {
        gsap.to(card.querySelector(".food-image"), {
            x: "0%",
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
                // markers: true,
            }
        });
    });

}); // Close DOMContentLoaded