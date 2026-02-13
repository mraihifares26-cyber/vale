// Screen transitions
document.addEventListener('DOMContentLoaded', function() {
    const entryScreen = document.getElementById('entryScreen');
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    const openBtn = document.getElementById('openBtn');

    // Add fadeOut animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Handle opening the letter
    if (openBtn) {
        openBtn.addEventListener('click', function() {
            console.log('Open button clicked');

            // Hide entry screen
            entryScreen.style.animation = 'fadeOut 0.5s ease';

            setTimeout(() => {
                entryScreen.classList.add('hidden');
                loadingScreen.classList.remove('hidden');

                // Show main content after loading
                setTimeout(() => {
                    loadingScreen.style.animation = 'fadeOut 0.5s ease';

                    setTimeout(() => {
                        loadingScreen.classList.add('hidden');
                        mainContent.classList.remove('hidden');
                        initializeMainContent();
                    }, 500);
                }, 3000); // 3 seconds loading time
            }, 500);
        });
    }

    function initializeMainContent() {
        // Main Valentine question functionality
        const yesBtn = document.getElementById('yesBtn');
        const noBtn = document.getElementById('noBtn');
        const response = document.getElementById('response');
        const subtitle = document.querySelector('.subtitle');
        const buttonsDiv = document.querySelector('.buttons');

        if (!yesBtn || !noBtn) {
            console.error('Buttons not found');
            return;
        }

        let yesFontSize = 19.2;
        let noFontSize = 19.2;
        let yesPadding = 18;
        let noPadding = 18;

        // Make buttons container relative for absolute positioning
        buttonsDiv.style.position = 'relative';
        buttonsDiv.style.minHeight = '200px';

        // Yes button click handler - Redirect to success page
        yesBtn.addEventListener('click', function() {
            console.log('Yes clicked');
            // Create a quick celebration before redirect
            createQuickConfetti();

            // Redirect after a brief moment
            setTimeout(() => {
                window.location.href = 'success.html';
            }, 500);
        });

        // Make No button run away from cursor - FIXED VERSION
        noBtn.addEventListener('mouseover', function(e) {
            console.log('No button hover');
            const btn = noBtn;
            const buttonsContainer = buttonsDiv;

            // Get the dimensions
            const containerRect = buttonsContainer.getBoundingClientRect();
            const btnRect = btn.getBoundingClientRect();

            // Calculate safe boundaries (keep button fully inside container)
            const minX = 10;
            const minY = 10;
            const maxX = containerRect.width - btnRect.width - 10;
            const maxY = containerRect.height - btnRect.height - 10;

            // Generate random position within safe boundaries
            let newX = Math.random() * (maxX - minX) + minX;
            let newY = Math.random() * (maxY - minY) + minY;

            // Ensure values are positive and within bounds
            newX = Math.max(minX, Math.min(newX, maxX));
            newY = Math.max(minY, Math.min(newY, maxY));

            // Apply new position
            btn.style.position = 'absolute';
            btn.style.left = newX + 'px';
            btn.style.top = newY + 'px';
            btn.style.transition = 'all 0.3s ease';

            // Make Yes button bigger each time No runs away
            yesFontSize += 2;
            yesPadding += 1;
            yesBtn.style.fontSize = yesFontSize + 'px';
            yesBtn.style.padding = yesPadding + 'px ' + (yesPadding * 2.5) + 'px';
            yesBtn.style.transition = 'all 0.3s ease';
            yesBtn.style.position = 'relative';
            yesBtn.style.zIndex = '1';

            // Make No button smaller
            noFontSize = Math.max(noFontSize - 1, 10);
            noPadding = Math.max(noPadding - 1, 6);
            noBtn.style.fontSize = noFontSize + 'px';
            noBtn.style.padding = noPadding + 'px ' + (noPadding * 2.5) + 'px';

            // Change subtitle message
            const messages = [
                'Hey! Come back! 🥺',
                'Don\'t run away! 💔',
                'Please? 🙏',
                'Just click Yes! 😊',
                'The No button is shy! 💕',
                'You can\'t catch it! 😄',
                'Yes is the better choice! 👀',
                'Stop chasing me! 🏃',
                'I\'m running away! 💨',
                'Catch me if you can! 😜'
            ];

            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            subtitle.textContent = randomMessage;
        });

        // Also run away when trying to click (for mobile/touch)
        noBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();

            const btn = noBtn;
            const buttonsContainer = buttonsDiv;

            const containerRect = buttonsContainer.getBoundingClientRect();
            const btnRect = btn.getBoundingClientRect();

            const minX = 10;
            const minY = 10;
            const maxX = containerRect.width - btnRect.width - 10;
            const maxY = containerRect.height - btnRect.height - 10;

            let newX = Math.random() * (maxX - minX) + minX;
            let newY = Math.random() * (maxY - minY) + minY;

            newX = Math.max(minX, Math.min(newX, maxX));
            newY = Math.max(minY, Math.min(newY, maxY));

            btn.style.position = 'absolute';
            btn.style.left = newX + 'px';
            btn.style.top = newY + 'px';
            btn.style.transition = 'all 0.3s ease';

            yesFontSize += 2;
            yesPadding += 1;
            yesBtn.style.fontSize = yesFontSize + 'px';
            yesBtn.style.padding = yesPadding + 'px ' + (yesPadding * 2.5) + 'px';
            yesBtn.style.transition = 'all 0.3s ease';
            yesBtn.style.position = 'relative';
            yesBtn.style.zIndex = '1';

            noFontSize = Math.max(noFontSize - 1, 10);
            noPadding = Math.max(noPadding - 1, 6);
            noBtn.style.fontSize = noFontSize + 'px';
            noBtn.style.padding = noPadding + 'px ' + (noPadding * 2.5) + 'px';

            const messages = [
                'Nice try! 😄',
                'Nope! Try Yes instead! 💕',
                'You almost got me! 🏃'
            ];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            subtitle.textContent = randomMessage;
        });

        // If they somehow click No (very fast click)
        noBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const messages = [
                'Oops! Try clicking Yes instead! 🥺',
                'The No button doesn\'t work! 😄',
                'Nice try! But only Yes works here! 💕'
            ];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            subtitle.textContent = randomMessage;
        });

        // Quick confetti for transition
        function createQuickConfetti() {
            for (let i = 0; i < 30; i++) {
                setTimeout(function() {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.style.left = Math.random() * 100 + '%';
                    confetti.style.animationDelay = '0s';

                    const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ff69b4'];
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

                    document.body.appendChild(confetti);

                    setTimeout(() => confetti.remove(), 2000);
                }, i * 10);
            }
        }
    }
});