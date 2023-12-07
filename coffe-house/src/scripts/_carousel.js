const slides = document.querySelectorAll('.slider__item');
const btnPrev = document.querySelector('.slider__back');
const btnNext = document.querySelector('.slider__next');
const sliderContainer = document.querySelector('.slider__items');
const paginationProgress = document.querySelectorAll('.slider__pagination-progress');

let curSlide = 0;
const dotsAnimationStep = 10;
let curTime = 0;
let maxTime = 5000;
let isIntervalStarted = true;

let intervalSlide = setInterval(showNextSlide, (maxTime - curTime));
let intervalDots = setInterval(animateIntervalSlideProgress, dotsAnimationStep);

let touchInProgress = false;
let swipeStartPoint = 0;
let swipeDirection = null;

function animateSlides() {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - curSlide)}%)`
  })
}

function showNextSlide() {
  curTime = 0;
  setDefaultDotStyle();
  curSlide = curSlide === slides.length - 1 ? 0 : curSlide += 1;
  animateSlides();
  stopIntervals();
  startIntervals();
}

function showPrevSlide() {
  curTime = 0;
  setDefaultDotStyle();
  curSlide = curSlide === 0 ? slides.length - 1 : curSlide -= 1;
  animateSlides();
  stopIntervals();
  startIntervals();
}

function animateIntervalSlideProgress() {
  curTime += dotsAnimationStep;

  const percentage = ((curTime) / (maxTime - 300)) * 100;
  // 300 is transition time set in styles for width of progress bar

  paginationProgress[curSlide].style.width = `${percentage}%`;
}

function setDefaultDotStyle() {
  paginationProgress[curSlide].style.width = '0%';
}

function stopIntervals() {
  isIntervalStarted = false;
  clearInterval(intervalSlide);
  clearInterval(intervalDots);
}

function startIntervals() {
  if (isIntervalStarted) return;

  intervalSlide = setInterval(showNextSlide, (maxTime - curTime));
  intervalDots = setInterval(animateIntervalSlideProgress, dotsAnimationStep);
  isIntervalStarted = true;
}


btnNext.addEventListener('click', showNextSlide);
btnPrev.addEventListener('click', showPrevSlide);
sliderContainer.addEventListener('mouseenter', () => {
  if (!touchInProgress) {
    stopIntervals()
  }
});

sliderContainer.addEventListener('mouseleave', () => {
  if (!touchInProgress) {
    startIntervals()
  }
});

sliderContainer.addEventListener('touchstart', (e) => {
  swipeStartPoint = e.touches[0].clientX

  touchInProgress = true;
  stopIntervals();
});

sliderContainer.addEventListener('touchend', (e) => {
  swipeStartPoint = 0;

  if (swipeDirection === 'right') {
    showPrevSlide()
  } else if (swipeDirection === 'left') {
    showNextSlide();
  } else {
    startIntervals();
  }

  setTimeout(() => {
    touchInProgress = false
  }, 5)
  swipeDirection = null;
});

sliderContainer.addEventListener('touchmove', (e) => {
  const swipeLength = swipeStartPoint - e.touches[0].clientX;

  console.log('touchmove');


  if (swipeLength > 100 || swipeLength < -100) {
    swipeDirection = swipeLength < 0 ? 'right' : 'left';
  }
})