
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const flatpickr = require('flatpickr');
const input = document.querySelector('#datetime-picker');
const timeVolue = document.querySelector('.value')
const startButton = document.querySelector('button[data-start]');
const valueDays = document.querySelector('span[data-days]');
const valueHours = document.querySelector('span[data-hours]');
const valuesMinutes = document.querySelector('span[data-minutes]');
const valuesSeconds = document.querySelector('span[data-seconds]');
const label = document.querySelector('.label');


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

startButton.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    setDate = selectedDates[0];
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      startButton.disabled = false;
    }
    console.log(selectedDates[0]);
  },
};
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
flatpickr('#datetime-picker', options);

startButton.addEventListener('click', onClick);
function onClick() {
  intervalId = setInterval(() => {
    currentTime = Date.now();
    ms = setDate - currentTime;
    let time = convertMs(ms);
    valueDays.textContent = time.days;
    valueHours.textContent = time.hours;
    valuesMinutes.textContent = time.minutes;
    valuesSeconds.textContent = time.seconds;
    if (ms < 1000) {
      clearInterval(intervalId);
    }
  }, 1000);
};
