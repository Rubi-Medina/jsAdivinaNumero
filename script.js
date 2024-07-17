import confetti from 'https://cdn.skypack.dev/canvas-confetti';

document.getElementById('start-btn').addEventListener('click', () => {
    let min = 1;
    let max = 100;
    let guessedNumber = 0;
    let resultDiv = document.getElementById('result');

    function guessNumber() {
        if (min <= max) {
            guessedNumber = Math.floor((min + max) / 2);
            resultDiv.innerHTML = `<p>¿Es este tu número?: <strong>${guessedNumber}</strong></p>`;
            let userConfirmed = confirm(`¿Es ${guessedNumber} tu número?`);

            if (userConfirmed) {
                resultDiv.innerHTML = `<h2>¡Tu número es: ${guessedNumber}, excelente decisión!</h2>`;
                triggerConfetti();
            } else {
                let isHigher = confirm(`¿Es tu número mayor que ${guessedNumber}?`);
                if (isHigher) {
                    min = guessedNumber + 1;
                } else {
                    max = guessedNumber - 1;
                }
                guessNumber();
            }
        } else {
            resultDiv.innerHTML = `<h2>No se pudo encontrar el número. Por favor, intenta de nuevo.</h2>`;
        }
    }

    function triggerConfetti() {
        const confettiContainer = document.getElementById('confetti-container');
        const myCanvas = document.createElement('canvas');
        confettiContainer.appendChild(myCanvas);

        const myConfetti = confetti.create(myCanvas, {
            resize: true,
            useWorker: true
        });

        myConfetti({
            particleCount: 100,
            spread: 160
        });

        const duration = 30 * 1000;
        const end = Date.now() + duration;

        (function frame() {
            myConfetti({
                particleCount: 7,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });
            myConfetti({
                particleCount: 7,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }

    guessNumber();
});
