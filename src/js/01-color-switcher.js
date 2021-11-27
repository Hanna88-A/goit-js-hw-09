const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.querySelector('body')
let timerId = null

startButton.addEventListener('click', onStartButtonClick)

function onStartButtonClick(e) {
    timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    }, 1000)
    startButton.disabled = e.currentTarget.click
    stopButton.disabled = !e.currentTarget.click
  
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

stopButton.addEventListener('click', onStopButtonClick)


function onStopButtonClick(e) {
    clearInterval(timerId)
    startButton.disabled = !e.currentTarget.click
    stopButton.disabled = e.currentTarget.click
}