/* ========= Burger Menu =========== */
const burgerButton = document.querySelector('.header__burger-button');
const navPage = document.querySelector('.header__nav--page');
const navMenu = document.querySelector('.header__nav--menu');

function toggleBurgerMenu() {
  burgerButton.classList.toggle('active');
  navPage.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.classList.toggle('no-scroll')
}

burgerButton.addEventListener('click', toggleBurgerMenu)