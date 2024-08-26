let timer;
let isRunning = false;
let startTime = 0;
let elapsedTime = 0;

const startStopBtn = document.getElementById('start-stop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapsList = document.getElementById('laps');

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function updateDisplay() {
    const now = Date.now();
    const timeElapsed = now - startTime + elapsedTime;
    const minutes = Math.floor(timeElapsed / 60000);
    const seconds = Math.floor((timeElapsed % 60000) / 1000);
    const milliseconds = Math.floor((timeElapsed % 1000) / 10);

    minutesDisplay.textContent = formatTime(minutes);
    secondsDisplay.textContent = formatTime(seconds);
    millisecondsDisplay.textContent = formatTime(milliseconds);
}

function startStopTimer() {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now();
        timer = setInterval(updateDisplay, 10);
        startStopBtn.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    startStopBtn.textContent = 'Start';
    elapsedTime = 0;
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
    millisecondsDisplay.textContent = '00';
    lapsList.innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        const lapTime = `${minutesDisplay.textContent}:${secondsDisplay.textContent}:${millisecondsDisplay.textContent}`;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
        lapsList.appendChild(lapItem);
    }
}

startStopBtn.addEventListener('click', startStopTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
