document.addEventListener("DOMContentLoaded", () => {
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
                destinationTextEl.style.color = 'var(--accent-pink-2)'; // Change color for emphasis
            }
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);

    updateCountdown();
});

