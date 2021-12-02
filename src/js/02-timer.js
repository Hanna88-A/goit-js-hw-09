import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    input: document.querySelector('#datetime-picker'),
    buttonStart: document.querySelector('[data-start]'),
    addDays: document.querySelector('[data-days]'),
    addHours: document.querySelector('[data-hours]'),
    addMinutes: document.querySelector('[data-minutes]'),
    addSeconds: document.querySelector('[data-seconds]'),
}

refs.buttonStart.disabled = true;
let intervalId = 0;
let chosenDate = 0;

const option = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const currentData = Date.now()
    
        if (selectedDates[0] < currentData) {
            
            Notify.failure("Please choose a date in the future")
        }
        if ((selectedDates[0]) > currentData) {
            chosenDate = selectedDates[0].getTime()
            refs.buttonStart.disabled = false
        }
       
    }
}

const ft = flatpickr('#datetime-picker', option)


refs.buttonStart.addEventListener('click', onButtonStart)
function onButtonStart() {
       intervalId = setInterval(() => {
        const currentTime = Date.now();
           const deltaTime = currentTime - chosenDate;
           if (-deltaTime > 0) {
               const timeToStart = convertMs(-deltaTime);
               updateTimer(timeToStart);
           }
       }, 1000);
}
  
 function pad(value) {
    return String(value).padStart(2, '0');
  }






function convertMs(ms) {
    // ms = options.onClose()
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

     
    
  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

console.log(convertMs()); // {days: 0, hours: 0, minutes: 0, seconds: 2}

function updateTimer({ days, hours, minutes, seconds }) {
    refs.addDays.textContent = days;
    refs.addHours.textContent = hours;
    refs.addMinutes.textContent = minutes;
    refs.addSeconds.textContent  = seconds;
}

