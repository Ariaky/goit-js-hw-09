const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  };

startBtn.addEventListener("click", handlerStart);
stopBtn.addEventListener("click", handlerStop);

function handlerStart() {
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
        startBtn.disabled = true;
        stopBtn.removeAttribute('disabled');
    }, 1000);
};
  
function handlerStop() {
    clearInterval(timerId);
    stopBtn.disabled = true;
    startBtn.removeAttribute('disabled');
} ; 