import menuData from '../data/products.json';
import { images } from './_image-imports';

const menuItems = document.querySelector('ul.menu__items');
const backdrop = document.querySelector('#backdrop');

let totalPrice = 0;

function showModal() {
  backdrop.classList.add('active');
  document.body.classList.add('no-scroll');
}

function hideModal() {
  backdrop.classList.remove('active');
  document.body.classList.remove('no-scroll');
}

function sizesList(sizes) {
  let component = '';

  for (let key in sizes) {
    component += `
    <li data-add-price="${sizes[key]['add-price']}" class="button-font${
      key === 's' ? ' active' : ''
    }"><span>${key}</span>${sizes[key].size}</li>
    `;
  }

  return component;
}

function additivesList(additives) {
  let component = '';

  additives.forEach((additive, index) => {
    component += `
      <li data-add-price="${additive['add-price']}" class="button-font"><span>${index + 1}</span>${additive.name}</li>
    `;
  });

  return component;
}

function renderNewPrice() {
  const priceEl = document.querySelector('.item__price-to-pay');
  priceEl.textContent = `$${totalPrice}`;
}

function modalComponent({ category, index, name, description, sizes, additives }) {
  const component = `
  <div class="modal">
    <div class="item__img">
      <picture>
        <source srcset="${images[category][index].webp}" type="image/webp">
        <source srcset="${images[category][index].orig}">
        <img src="${images[category][index].orig}" alt="${category}-${index}">
      </picture>
    </div>
    <div class="item__content">
      <div class="item__description">
        <h4 class="heading-3">${name}</h4>
        <p class="medium">${description}</p>
      </div>
      <div class="item__sizes">
        <h5 class="medium">Size</h5>
        <ul class="item__tabs">
          ${sizesList(sizes)}
        </ul>
      </div>
      <div class="item__additives">
        <h5 class="medium">Additives</h5>
        <ul class="item__tabs">
          ${additivesList(additives)}
        </ul>
      </div>
      <div class="heading-3 item__total-price">
        <span>Total:</span><span class="item__price-to-pay">$${totalPrice}</span>
      </div>
      <div class="item__alert">
        <img class="item__alert-icon" src="${images.icons.info}" alt="info">
        <p class="caption">The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</p>
      </div>
      <button class="item__close-modal button-font" type="button">Close</button>
    </div>
  </div>
  `;

  return component;
}

function renderModalContent(menuItem) {
  backdrop.innerHTML = '';
  backdrop.innerHTML = modalComponent(menuItem);
}

function selectSize(allSizes, selectedSizeItem) {
  let prevSizePrice;
  const newSizePrice = selectedSizeItem.dataset.addPrice;

  allSizes.forEach((el) => {
    if (el.classList.contains('active')) prevSizePrice = el.dataset.addPrice;

    el.classList.remove('active');
  });
  selectedSizeItem.classList.add('active');

  totalPrice = (parseFloat(totalPrice) - parseFloat(prevSizePrice) + parseFloat(newSizePrice)).toFixed(2);

  renderNewPrice();
}

function selectAdditive(selectedAdditive) {
  const price = selectedAdditive.dataset.addPrice;

  selectedAdditive.classList.contains('active')
    ? (totalPrice = (parseFloat(totalPrice) - parseFloat(price)).toFixed(2))
    : (totalPrice = (parseFloat(totalPrice) + parseFloat(price)).toFixed(2));

  selectedAdditive.classList.toggle('active');

  renderNewPrice();
}

backdrop.addEventListener('click', (e) => {
  // close modal on click on backdrop or close button
  if (e.target.closest('.item__close-modal')) hideModal();

  if (e.target.closest('.modal')) return;

  hideModal();
});

backdrop.addEventListener('click', (e) => {
  // select new size
  const selectedSizeItem = e.target.closest('.item__sizes li');

  if (!selectedSizeItem) return;

  const sizesContainer = e.target.closest('.item__tabs');
  const allSizes = sizesContainer.querySelectorAll('.item__sizes li');

  selectSize(allSizes, selectedSizeItem);
});

backdrop.addEventListener('click', (e) => {
  // select additives
  const selectedAdditive = e.target.closest('.item__additives li');

  if (!selectedAdditive) return;

  selectAdditive(selectedAdditive);
});

menuItems.addEventListener('click', (e) => {
  const menuItem = e.target.closest('.menu__item');

  if (!menuItem) return;

  const { category, index } = menuItem.dataset;
  const selectedItem = menuData.filter((item) => item.category === category)[index];

  totalPrice = selectedItem.price;

  showModal();
  renderModalContent({ ...selectedItem, index });
});
