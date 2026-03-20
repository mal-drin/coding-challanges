const inputs = document.querySelectorAll('.controls input');
const images = document.querySelectorAll('img');
let selectedImage = null;

function handleUpdate() {
  if (!selectedImage) return;
  
  const suffix = this.dataset.sizing || '';
  const value = this.value + suffix;
  
  if (this.name === 'spacing') {
    selectedImage.style.setProperty('--spacing', value);
  } else if (this.name === 'blur') {
    selectedImage.style.setProperty('--blur', value);
  } else if (this.name === 'base') {
    selectedImage.style.setProperty('--base', value);
  }
}

function selectImage(e) {

  images.forEach(img => img.classList.remove('selected'));
  

  selectedImage = e.target;
  selectedImage.classList.add('selected');
}


images.forEach(img => {
  img.addEventListener('click', selectImage);
});

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));