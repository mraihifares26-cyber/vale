document.addEventListener('DOMContentLoaded', function() {
    // Create continuous confetti effect
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.borderRadius = '50%';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.zIndex = '1000';
        confetti.style.pointerEvents = 'none';

        const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffc0cb', '#ff6b9d'];
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        confetti.style.animation = 'confettiFall 4s linear';

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 4000);
    }

    // Add confetti animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Create confetti continuously
    setInterval(createConfetti, 300);
});