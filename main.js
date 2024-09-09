document.addEventListener('DOMContentLoaded', () => {
// Show promo modal after 3 seconds  
  setTimeout(() => {
      const modal = document.getElementById('promo-modal');
      modal.style.display = 'flex'; 
  }, 3000);
  
// Close promo modal when close buton is clicked
  document.querySelector('.close').addEventListener('click', () => {
      document.getElementById('promo-modal').style.display = 'none';
  });

// Close promo modal if user clicks outside the modal  
  window.addEventListener('click', (event) => {
      const modal = document.getElementById('promo-modal');
      if (event.target === modal) {
          modal.style.display = 'none';
      }
  });

//Hide promo modal when 'Shop Now' button is clicked
  const shopNowButton = document.getElementById('shop-now-btn');
  if (shopNowButton) {
      shopNowButton.addEventListener('click', () => {
          document.getElementById('promo-modal').style.display = 'none';
      });
  }

  // Main elements and icons
  const search = document.querySelector('.search-box');
  const favoritesSection = document.getElementById('favorites');
  const favoritesContent = document.getElementById('favorites-content');
  const cart = document.querySelector('.cart');
  const user = document.querySelector('.user');
  const navbar = document.querySelector('.navbar');
  const header = document.querySelector('header');
  const favoritesIcon = document.getElementById('favorites-icon');
  const searchIcon = document.getElementById('search-icon');
  const cartIcon = document.getElementById('cart-icon');
  const userIcon = document.getElementById('user-icon');
  const menuIcon = document.getElementById('menu-icon');
  const cartContent = document.getElementById('cart-content');
  const cartCounter = document.getElementById('cart-counter');
  const registerForm = document.getElementById('register-form');

  // Create checkout button and cart total element
  const cartTotal = document.createElement('div');
  const checkoutButton = document.createElement('button');
  checkoutButton.textContent = 'Checkout';
  checkoutButton.classList.add('checkout-button');
  cartTotal.classList.add('cart-total');
  cartTotal.textContent = 'Total: $0.00';

  cartContent.appendChild(checkoutButton);
  cartContent.appendChild(cartTotal);

  let cartItems = {};

// Helper functions to close all other sections except the given element
  const closeAllExcept = (exceptElement) => {
      [search, cart, user, navbar, favoritesSection, registerForm].forEach(element => {
          if (element !== exceptElement) {
              element.classList.remove('active');
          }
      });
  };

// Update cart item count
  const updateCartCounter = () => {
      const totalItems = Object.values(cartItems).reduce((sum, count) => sum + count, 0);
      cartCounter.textContent = totalItems;
  };

// Update the total price in the cart
  const updateCartTotal = () => {
      let totalPrice = 0;
      Object.keys(cartItems).forEach(productName => {
          const productElement = Array.from(document.querySelectorAll('.box'))
              .find(item => item.querySelector('h3').textContent === productName);
          if (productElement) {
              const priceText = productElement.querySelector('span').textContent;
              const price = parseFloat(priceText.replace('$', ''));
              if (!isNaN(price)) {
                  totalPrice += price * cartItems[productName];
              }
          }
      });
      cartTotal.textContent = `Total: $${totalPrice.toFixed(2)}`;
  };

// Function to add product to the cart
  const addToCart = (productElement) => {
      const productName = productElement.querySelector('h2').textContent;
      const productImage = productElement.querySelector('img').src;
      const productPriceText = productElement.querySelector('span').textContent;
      const productPrice = parseFloat(productPriceText.replace('$', ''));

      if (!cartItems[productName]) {
          cartItems[productName] = 1;
          const cartItem = document.createElement('div');
          cartItem.classList.add('box');
          cartItem.innerHTML = `
              <img src="${productImage}" alt="${productName}">
              <div class="text">
                  <h3>${productName}</h3>
                  <span>${productPriceText}</span>
                  <span class="quantity">x${cartItems[productName]}</span>
              </div>
              <i class='bx bxs-trash-alt remove-cart-item'></i>
          `;
          cartContent.insertBefore(cartItem, cartTotal);
     //Remove product from cart when trash icon is clicked
          cartItem.querySelector('.remove-cart-item').addEventListener('click', () => {
              cartContent.removeChild(cartItem);
              delete cartItems[productName];
              updateCartCounter();
              updateCartTotal();
          });
      } else {
          cartItems[productName]++;
          const cartItem = Array.from(cartContent.querySelectorAll('.box'))
              .find(item => item.querySelector('h3').textContent === productName);
          if (cartItem) {
              cartItem.querySelector('.quantity').textContent = `x${cartItems[productName]}`;
          }
      }

      updateCartCounter();
      updateCartTotal();
  };

// Toggle visibility for various icons
  const toggleElement = (element) => {
      element.classList.toggle('active');
      closeAllExcept(element);
  };

// Event listeners for icon clicks
  favoritesIcon.addEventListener('click', () => toggleElement(favoritesSection));
  searchIcon.addEventListener('click', () => toggleElement(search));
  cartIcon.addEventListener('click', () => toggleElement(cart));
  userIcon.addEventListener('click', () => toggleElement(user));
  menuIcon.addEventListener('click', () => toggleElement(navbar));

//Add and remove products from favorites
  document.querySelectorAll('.favorites-icon').forEach(button => {
      button.addEventListener('click', (event) => {
          const productElement = event.target.closest('.box');
          if (!productElement) return;
          const productName = productElement.querySelector('h2').textContent;
          const productImage = productElement.querySelector('img').src;
          const productPrice = productElement.querySelector('span').textContent;
          const isActive = event.target.classList.toggle('active');

          if (isActive) {
              const favoritesItem = document.createElement('div');
              favoritesItem.classList.add('favorites-item');
              favoritesItem.innerHTML = `
                  <img src="${productImage}" alt="${productName}">
                  <div class="text">
                      <h3>${productName}</h3>
                      <span>${productPrice}</span>
                  </div>
                  <i class='bx bx-x remove-favorites-item'></i>
              `;
              favoritesContent.appendChild(favoritesItem);
            // Remove product from favorites when remove icon is clicked
              favoritesItem.querySelector('.remove-favorites-item').addEventListener('click', () => {
                  favoritesContent.removeChild(favoritesItem);
                  event.target.classList.remove('active');
              });
          } else {
              const favoritesItems = favoritesContent.querySelectorAll('.favorites-item');
              favoritesItems.forEach(item => {
                  if (item.querySelector('h3').textContent === productName) {
                      favoritesContent.removeChild(item);
                  }
              });
          }
      });
  });
  
// Show register from
  document.querySelector('#show-register').addEventListener('click', () => {
      document.querySelector('#register-form').classList.add('active');
  });

// Show login from and hide register form
  document.querySelector('#show-login').addEventListener('click', () => {
      document.querySelector('#register-form').classList.remove('active');
      document.querySelector('.user').classList.add('active');
  });

  // Close all open sections if user clicks outside of them
  document.addEventListener('click', (event) => {
      if (![search, favoritesSection, cart, user, navbar, registerForm].includes(event.target.closest('div')) &&
          ![favoritesIcon, searchIcon, cartIcon, userIcon, menuIcon].includes(event.target)) {
          closeAllExcept();
      }
  });

  // Swiper for new arrivals section
  new Swiper(".new-arrival", {
      spaceBetween: 20,
      loop: true,
      autoplay: {
          delay: 5500,
          disableOnInteraction: false,
      },
      centeredSlides: true,
      breakpoints: {
          0: { slidesPerView: 1 },
          568: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          1020: { slidesPerView: 3 },
      },
  });

  // Sorting event
  document.getElementById('sort').addEventListener('change', function () {
      const productContainer = document.querySelector('.product-container');
      const products = Array.from(productContainer.querySelectorAll('.box'));
      const sortBy = this.value;

      const sortedProducts = products.sort((a, b) => {
          const aPrice = parseFloat(a.querySelector('span').innerText.replace('$', ''));
          const bPrice = parseFloat(b.querySelector('span').innerText.replace('$', ''));

          if (sortBy === 'price-asc') return aPrice - bPrice;
          if (sortBy === 'price-desc') return bPrice - aPrice;
          return 0;
      });

      productContainer.innerHTML = '';
      sortedProducts.forEach(product => productContainer.appendChild(product));
  });

  // Add to cart functionality
  document.querySelectorAll('.bx-cart-alt').forEach(button => {
      button.addEventListener('click', (event) => {
          const productElement = event.target.closest('.box');
          if (productElement) {
              addToCart(productElement);
          }
      });
  });
});
