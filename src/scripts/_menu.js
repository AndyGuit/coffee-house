import menuData from '../data/products.json';
import { images } from './_image-imports';

const menuContainer = document.querySelector('ul.menu__items');
const menuOptions = document.querySelectorAll('li.menu__option');
const loadMoreBtn = document.querySelector('button.menu__refresh');

let category = 'coffee';
let limitProductsPerCategory = 0;

document.addEventListener('DOMContentLoaded', () => {
  checkWindowSize()
})

window.addEventListener('resize', (e) => {
  checkWindowSize()
})

loadMoreBtn.addEventListener('click', () => {
  limitProductsPerCategory = 8;
  loadMoreBtn.style.display = 'none';
  renderMenu();
})

function checkWindowSize() {
  if (window.innerWidth < 769) {
    limitProductsPerCategory = 4;
    loadMoreBtn.style.display = 'block';
    renderMenu();
  } else {
    limitProductsPerCategory = 8;
    loadMoreBtn.style.display = 'none';
    renderMenu();
  }
}

function getItemsByCategory() {
  return menuData.filter(item => item.category === category);
}

function changeMenuOption(selectedCategory) {
  category = selectedCategory;

  checkWindowSize();

  menuOptions.forEach(option => {
    const optionCategory = option.dataset.category;
    const isActive = optionCategory === category;
    option.className = `menu__option link-font${isActive ? ' active' : ''}`;
  })
}

menuOptions.forEach(option => {
  option.addEventListener('click', () => {
    const selectedCategory = option.dataset.category
    changeMenuOption(selectedCategory);
    renderMenu();
  })
})

function menuItemComponent({name, description, price, category, index}) {
  const item = `
    <li data-category="${category}" data-index="${index}" class="menu__item">
      <div class="menu__item-photo">
        <img src="${images[category][index]}" alt="${category}-${index}">
      </div>
      <div class="menu__item-description">
        <h4 class="heading-3">${name}</h4>
        <p class="medium">${description}</p>
        <h5 class="heading-3">$${price}</h5>
      </div>
    </li>
    `;

  return item;
}

function renderMenu() {
  const items = getItemsByCategory();
  let limitedItems;

  if (limitProductsPerCategory > 0) {
    limitedItems = items.slice(0, limitProductsPerCategory);
  } else {
    limitedItems = items;
  }

  if (limitedItems.length === items.length || items.length < 5) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'block';
  }

  menuContainer.innerHTML = '';
  limitedItems.forEach((item, index) => {
    const { name, description, price, category } = item;
    menuContainer.innerHTML += menuItemComponent({name, description, price, category, index});
  })
};