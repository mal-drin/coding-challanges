const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

const hrs = document.getElementById('hr');
const min = document.getElementById('min');
const secs = document.getElementById('sec');

function setDate() {
  const day = new Date();

  const seconds = day.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  if (secondsDegrees === 90) {
    secondHand.style.transition = 'none';
    } else {
    secondHand.style.transition = '';
    }
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
  

  const mins = day.getMinutes();
  if (mins === 90){
    minsHand.style.transition = 'none';
  } else {
    minsHand.style.transition = '';
  }
  const minsDegrees = ((mins / 60) * 360) + 90;
  minsHand.style.transform = `rotate(${minsDegrees}deg)`;

  
  const hours = day.getHours();
  if (hours === 90){
    hourHand.style.transition = 'none';
  } else {
    hourHand.style.transition = '';
  }
  const hoursDegrees = ((hours / 12) * 360) + 90;
  hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
  

   hrs.textContent = (hours < 10 ? '0' : '') + hours;
   min.textContent = (mins < 10 ? '0' : '') + mins;
   secs.textContent = (seconds < 10 ? '0' : '') + seconds;
    
}
  setInterval(setDate, 1000);

