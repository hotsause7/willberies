const showCart = () => {
    const cartBtn = document.querySelector('.button-cart');
    const cart = document.getElementById('modal-cart');
    const closeModal = cart.querySelector('.modal-close');

    cartBtn.addEventListener('click', () => {
        cart.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        console.log(cartBtn.closest);
        
    });

    closeModal.addEventListener('click', () => {
        cart.style.display = 'none';
        document.body.style.overflow = '';
    });
    
}

showCart();

// const list = document.querySelector('.goods-list'); // контейнер со всеми карточками

// list.addEventListener('click', (e) => {
//   const button = e.target.closest('.add-to-cart');
//   if (!button) return; // клик не по кнопке

//   const card = button.closest('.goods-card'); // та самая карточка
//   if (!card) return;

//   // 1) Из data-* (надёжно)
//   const id = card.dataset.id;
//   const title = card.dataset.title;
//   const priceCents = Number(card.dataset.price);
//   const image = card.dataset.img;

//   // 2) Или из DOM (если нет data-*)
//   // const title = card.querySelector('.goods-title')?.textContent.trim();
//   // const priceText = card.querySelector('.goods-price')?.textContent;
//   // const image = card.querySelector('img')?.src;

//   // Здесь у вас есть данные именно этой карточки
//   // addToCart({ id, title, priceCents, image, qty: 1 });
// });

// document.querySelectorAll('.add-to-cart').forEach((btn) => {
//     btn.addEventListener('click', () => {
//       const card = btn.closest('.goods-card');
//       const { id, title, price, img } = card.dataset;
//       // addToCart({ id, title, priceCents: Number(price), image: img, qty: 1 });
//     });
//   });
