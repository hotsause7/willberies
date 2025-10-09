const showCart = () => {
    const cartBtn = document.querySelector('.button-cart');
    const cart = document.getElementById('modal-cart');
    const closeModal = cart.querySelector('.modal-close');

    cartBtn.addEventListener('click', () => {
        cart.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    closeModal.addEventListener('click', () => {
        cart.style.display = 'none';
        document.body.style.overflow = '';
    });
    
}

showCart();

