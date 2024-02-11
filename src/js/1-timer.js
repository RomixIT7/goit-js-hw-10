import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import errorIcon from '../img/error.svg';
import closeIcon from '../img/close.svg';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('.timer-start-btn');
const daysOutput = document.querySelector('span[data-days]');
const hoursOutput = document.querySelector('span[data-hours]');
const minutesOutput = document.querySelector('span[data-minutes]');
const secondsOutput = document.querySelector('span[data-seconds]');

let userSelectedDate;
let diff;
let isActive = false;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    userSelectedDate = new Date(input.value).getTime();
    const currentDate = new Date().getTime();
    function onBtnClick() {
      diff = userSelectedDate - currentDate;
      const intervalId = setInterval(() => {
        diff -= 1000;
        const time = convertMs(diff);
        const { days, hours, minutes, seconds } = time;
        daysOutput.textContent = addLeadingZero(days);
        hoursOutput.textContent = addLeadingZero(hours);
        minutesOutput.textContent = addLeadingZero(minutes);
        secondsOutput.textContent = addLeadingZero(seconds);
        if (diff <= 1000) {
          clearInterval(intervalId);
        }
      }, 1000);
      input.disabled = true;
      input.classList.add('datetime-picker-disabled');
      startBtn.disabled = true;
      startBtn.classList.remove('timer-start-btn-able');
      startBtn.removeEventListener('click', onBtnClick);
    }
    if (currentDate > userSelectedDate) {
      iziToast.show({
        message: 'Please choose a date in the future',
        messageColor: '#fff',
        messageSize: '16',
        backgroundColor: '#ef4040',
        progressBarColor: '#b51b1b',
        position: 'topRight',
        iconUrl: errorIcon,
        close: false,
        buttons: [
          [
            `<button type="submit" style="background-color: inherit"><img src='${closeIcon}'/></button>`,
            function (instance, toast) {
              instance.hide(
                {
                  transitionOut: 'fadeOut',
                },
                toast
              );
            },
          ],
        ],
      });
      startBtn.disabled = true;
      startBtn.classList.remove('timer-start-btn-able');
      startBtn.removeEventListener('click', onBtnClick);
    } else {
      startBtn.disabled = false;
      startBtn.classList.add('timer-start-btn-able');
      if (!isActive) {
        startBtn.addEventListener('click', onBtnClick);
        isActive = true;
      }
    }
  },
};
const fp = flatpickr(input, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
