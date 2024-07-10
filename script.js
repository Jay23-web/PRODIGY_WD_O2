let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 1000;
    let ms = Math.floor(diffInMs);

    let formattedHH = hh.toString().padStart(2, '0');
    let formattedMM = mm.toString().padStart(2, '0');
    let formattedSS = ss.toString().padStart(2, '0');
    let formattedMS = ms.toString().padStart(3, '0');

    return `${formattedHH}:${formattedMM}:${formattedSS}.${formattedMS}`;
}

function print(txt) {
    display.innerHTML = txt;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 10);
    showButton('PAUSE');
}

function pause() {
    clearInterval(timerInterval);
    showButton('PLAY');
}

function reset() {
    clearInterval(timerInterval);
    print("00:00:00.000");
    elapsedTime = 0;
    laps.innerHTML = '';
    showButton('PLAY');
}

function lap() {
    const lapTime = document.createElement('li');
    lapTime.innerText = timeToString(elapsedTime);
    laps.appendChild(lapTime);
}

function showButton(buttonKey) {
    const button = startStopBtn;
    if (buttonKey === 'PLAY') {
        button.innerHTML = 'Start';
        button.style.backgroundColor = '#28a745';
    } else {
        button.innerHTML = 'Pause';
        button.style.backgroundColor = '#ffc107';
    }
}

startStopBtn.addEventListener('click', function() {
    if (!isRunning) {
        start();
    } else {
        pause();
    }
    isRunning = !isRunning;
});

resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
