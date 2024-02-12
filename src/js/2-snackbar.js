import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import successIcon from '../img/success.svg';
import errorIcon from '../img/error.svg';
import closeIcon from '../img/close.svg';

const form = document.querySelector('.form');

form.addEventListener('submit', createNotification);

function createNotification(e) {
  e.preventDefault();
  const delay = form.elements.delay.value;
  const state = form.elements.state.value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
  promise
    .then(delay =>
      iziToast.show({
        message: `Fulfilled promise in ${delay}ms`,
        messageColor: '#fff',
        messageSize: '16',
        backgroundColor: '#59a10d',
        progressBarColor: '#326101',
        position: 'topRight',
        iconUrl: successIcon,
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
      })
    )
    .catch(delay =>
      iziToast.show({
        message: `Rejected promise in ${delay}ms`,
        messageColor: '#fff',
        messageSize: '16',
        backgroundColor: '#ef4040',
        progressBarColor: '#b51b1b',
        position: 'topRight',
        iconUrl: errorIcon,
        close: false,
        buttons: [
          [
            `<button type="submit" style="background-color: inherit"><img src="${closeIcon}"/></button>`,
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
      })
    );
}
