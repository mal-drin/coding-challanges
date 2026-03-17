const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e => {
const xOffset =75; // tune this
const yOffset = 50; // tune this
cursor.style.left = `${e.clientX - xOffset}px`;
cursor.style.top = `${e.clientY - yOffset}px`;
});

function playSound(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    console.log(audio);
    if(!audio) return; // stop the function from running
    audio.currentTime = 0; // rewind to the start
    audio.play();
    key.classList.add('playing');
  }

  const keys = document.querySelectorAll('.key');
  keys.forEach(key => key.addEventListener('transitionend', removeTransition));
  window.addEventListener('keydown', playSound);
  keys.forEach(key => key.addEventListener('click', clickSound));

  function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
  }

  function clickSound(e){
    const audio = document.querySelector(`audio[data-key="${this.dataset.key}"]`);
    if(!audio) return;
    audio.currentTime = 0; // rewind to the start
    audio.play();
    this.classList.add('playing');
  }






