import Notiflix from "notiflix";

const formEl = document.querySelector('.form');
const delayEl = document.querySelector('input[name="delay"]')
const stepEl = document.querySelector('input[name="step"]');
const amountEl = document.querySelector('input[name="amount"]');


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay }); // Fulfill
      } else {
        reject({ position, delay}); // Reject
      }
    }, delay);
  });
}

formEl.addEventListener('submit', handlerSubmit);

function handlerSubmit(e) {
  e.preventDefault();
  let delay = Number(delayEl.value);
  const step = Number(stepEl.value);
  const amount = Number(amountEl.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
      delay += step;
    }
}  
 