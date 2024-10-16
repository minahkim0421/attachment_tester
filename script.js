document.addEventListener('DOMContentLoaded', () => {
    const wordCards = document.querySelectorAll('.word-card');
    const wordContainer = document.getElementById('word-container');
    const popup = document.getElementById('popup');
    const resultSection = document.getElementById('result');
    const sentenceDisplay = document.getElementById('sentence');
    const sendEmailButton = document.getElementById('sendEmail');
    const emailInput = document.getElementById('email');
    
    let collectedWords = [];
    let isPopupVisible = false;

    function playAudio(fileName) {
        var audio = new Audio(fileName);
        audio.play();
    }
    
    function positionCards() {
        wordCards.forEach(card => {
            const randomX = Math.random() * (wordContainer.offsetWidth - 200);
            const randomY = Math.random() * (wordContainer.offsetHeight - 200);
            card.style.left = `${randomX}px`;
            card.style.top = `${randomY}px`;
        });
    }

    function checkProximity(card, mouseX, mouseY) {
        const rect = card.getBoundingClientRect();
        const cardX = rect.left + rect.width / 2;
        const cardY = rect.top + rect.height / 2;
        const distance = Math.sqrt((mouseX - cardX) ** 2 + (mouseY - cardY) ** 1);
        return distance < 20;
    }

    function attachCardsToMouse() {
        wordContainer.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            wordCards.forEach(card => {
                if (checkProximity(card, mouseX, mouseY)) {
                    card.style.left = `${mouseX - card.offsetWidth / 2}px`;
                    card.style.top = `${mouseY - card.offsetHeight / 2}px`;
                    playAudio('assets/hello.mp3')

                    const word = card.dataset.word;
                    if (!collectedWords.includes(word)) {
                        collectedWords.push(word);
                    }
                }
            });
        });
    }

    function showPopup() {
        popup.classList.remove('hidden');
        isPopupVisible = true;
    }

    function hidePopup() {
        popup.classList.add('hidden');
        isPopupVisible = false;
    }

    function showResult() {
        sentenceDisplay.textContent = collectedWords.join(' ') + '.';
        resultSection.classList.remove('hidden');
    }

    wordContainer.addEventListener('mousedown', () => {
        if (!isPopupVisible) {
            showPopup();
        }
    });

    document.getElementById('yesButton').addEventListener('click', () => {
        hidePopup();
        showResult();
    });

    document.getElementById('noButton').addEventListener('click', () => {
        hidePopup();
    });

    sendEmailButton.addEventListener('click', () => {
        const email = emailInput.value;
        if (email) {
            const sentence = 'Dear [Hiring Manager], \n \n I hope this email finds you well! \n \nI am excited to ' + collectedWords.join(' ') + '.' + '\n\n Thank you for your consideration. \n \nSincerely, \n[Your Name]';
            const mailtoLink = `mailto:${email}?subject=[INTERNSHIP APPLICATION]&body=${encodeURIComponent(sentence)}`;
            window.location.href = mailtoLink;
        } else {
            alert('Please enter a valid email address.');
        }
    });

    positionCards();
    attachCardsToMouse();
});
