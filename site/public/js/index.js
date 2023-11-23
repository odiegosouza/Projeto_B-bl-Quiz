const slider = document.querySelectorAll('.slider');
const btnPrev = document.getElementById('prev-button');
const btnNext = document.getElementById('next-button');

var currentSlide = 0;
var intervalId;

function hideSlider() {
  for (var i = 0; i < slider.length; i++) {
    slider[i].classList.remove('on');
  }
}

function showSlider() {
  slider[currentSlide].classList.add('on')
}

function nextSlider() {
  hideSlider()
  if(currentSlide === slider.length -1) {
    currentSlide = 0
  } else {
    currentSlide++
  }
  showSlider()
}

function prevSlider() {
  hideSlider()
  if(currentSlide === 0) {
    currentSlide = slider.length -1
  } else {
    currentSlide--
  }
  showSlider()
}

function startSlider() {
  intervalId = setInterval(nextSlider, 2000); // Muda a cada 2 segundos (2000 milissegundos)
}

function stopSlider() {
  clearInterval(intervalId);
}

startSlider(); // Inicia o slider automaticamente
