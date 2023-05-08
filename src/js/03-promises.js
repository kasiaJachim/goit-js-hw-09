import Notiflix from 'notiflix';
Notiflix.Notify.init({
  pauseOnHover: false,
});

const inputDeyal = document.querySelector('input[name = "delay"]');
const inputStep = document.querySelector('input[name = "step"]');
const inputAmout = document.querySelector('input[name = "amount"]');
const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }else{
        reject({ position, delay });
      }
    }, delay);
  });
}
function handleSubmit(e) {
  e.preventDefalt();
  const delayEl = Number(inputDeyal.value);
  const stepEl = Number(inputStep.value);
  const amountEl = Number(inputStep.value);

  let firstDelay = delayEl;

  for (let i = 1; i <= amountEl; i += 1) {
    createPromise(i, firstDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`,);
      });
    firstDelay = delayEl + i * stepEl;
  }
}
