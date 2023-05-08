'use strict'
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;
startButton.addEventListener('click', () => {
   timerId = setInterval(() => {
        let color = getRandomHexColor();
       body.style.backgroundColor = getRandomHexColor();
       startButton.disabled = true;
    }, 1000);
});
stopButton.addEventListener('click', () => {
    clearInterval(timerId);
    startButton.disabled = false;
});
