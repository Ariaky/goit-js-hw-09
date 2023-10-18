import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputEl = document.getElementById('datetime-picker');
const btnEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let timerId = null;
btnEl.disabled = true;

const options = {
    enableTime: true, // Enables time picker 
    time_24hr: true, // Displays time picker in 24 hour mode without AM/PM selection when enabled.
    defaultDate: new Date(), // Sets the initial selected date
    minuteIncrement: 1, // Adjusts the step for the minute input (incl. scrolling)
    onClose(selectedDates) {
        if (selectedDates[0] < this.config.defaultDate) {
            Notiflix.Notify.failure('Please choose a date in the future');
            btnEl.disabled = true;
        }
        else {
           btnEl.disabled = false; 
           btnEl.addEventListener('click', handlerBtn);
        }
    },
  };

const fp = flatpickr(inputEl, options);

function handlerBtn() {
    const selectedDate = fp.selectedDates[0];
    inputEl.disabled = true;
    btnEl.disabled = true;
    timerId = setInterval(() => {
        const startTime = new Date();
        const count = selectedDate - startTime;
        formatDate(convertMs(count));
        if (count < 1000) {
        clearInterval(timerId);
        inputEl.disabled = false;
    }
  }, 1000);
};

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day); // Remaining days
    const hours = Math.floor((ms % day) / hour); // Remaining hours
    const minutes = Math.floor(((ms % day) % hour) / minute); // Remaining minutes
    const seconds = Math.floor((((ms % day) % hour) % minute) / second); // Remaining seconds
  
    return { days, hours, minutes, seconds };
  };
  
const addLeadingZero = value => {
    return String(value).padStart(2, 0);
  };

function formatDate (leadingTime) {
    daysEl.textContent = addLeadingZero(leadingTime.days);
    hoursEl.textContent = addLeadingZero(leadingTime.hours);
    minutesEl.textContent = addLeadingZero(leadingTime.minutes);
    secondsEl.textContent = addLeadingZero(leadingTime.seconds);
};
