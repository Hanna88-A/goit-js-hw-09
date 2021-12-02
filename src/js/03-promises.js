import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('form');

form.addEventListener('submit', onSubmit);

let firstDelay = 0;
let delayStep = 0;
let amount = 0;
let delay = 0;


function createPromise( position, delay) {
  
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }

    }, delay);
  })

}

function onSubmit(e) {
  e.preventDefault()
  firstDelay = Number(form.elements.delay.value);
  delayStep = Number(form.elements.step.value);
  amount = Number(form.elements.amount.value);
  delay = firstDelay;
  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    delay = firstDelay + delayStep * position;
  }
  

}






  