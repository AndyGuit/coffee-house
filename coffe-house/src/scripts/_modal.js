const menuItems = document.querySelector('ul.menu__items');
const backdrop = document.querySelector('#backdrop');

function showModal() {
  backdrop.classList.add('active');
};

menuItems.addEventListener('click', (e) => {
  const menuItem = e.target.closest('.menu__item');

  if (!menuItem) return;

  // showModal()
})