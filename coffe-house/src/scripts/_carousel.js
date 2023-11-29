const slides = document.querySelectorAll('.slider__item');
const btnPrev = document.querySelector('.slider__back');
const btnNext = document.querySelector('.slider__next');
const paginationProgress = document.querySelectorAll('.slider__pagination-progress');

let curSlide = 0;
const dotsAnimationStep = 10;
let curTime = 0;
let maxTime = 5000;

function animateSlides() {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - curSlide)}%)`
  })
}
animateSlides();

function showNextSlide() {
  curTime = 0;
  setDefaultDotStyle();
  curSlide = curSlide === slides.length - 1 ? 0 : curSlide += 1;
  animateSlides();
}

function showPrevSlide() {
  curTime = 0;
  setDefaultDotStyle();
  curSlide = curSlide === 0 ? slides.length - 1 : curSlide -= 1;
  animateSlides();
}

btnNext.addEventListener('click', showNextSlide);
btnPrev.addEventListener('click', showPrevSlide);

function animateIntervalSlideProgress() {
  curTime += dotsAnimationStep;

  const percentage = ((curTime) / (maxTime - 300)) * 100;

  paginationProgress[curSlide].style.width = `${percentage}%`;
}

function setDefaultDotStyle() {
  paginationProgress[curSlide].style.width = '0%';
}

function startIntervalicSlideChange() {
  const interval = setInterval(() => {
    showNextSlide()
  } , (maxTime - curTime))
}

function startIntervalicDotsChange() {
  const interval = setInterval(() => {
    animateIntervalSlideProgress()
  }, dotsAnimationStep);
}

startIntervalicSlideChange();
startIntervalicDotsChange();
