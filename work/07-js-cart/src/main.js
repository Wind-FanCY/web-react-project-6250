import { addToCart, updateQuantity, checkout, toggleCart } from "./model";
import { renderProducts, renderCart } from "./view";

document.querySelector('.products-container').addEventListener('click', (e) => {
    if (e.target.classList.contains('product-add')) {
        const productIndex = e.target.dataset.productId;
        addToCart(productIndex);
        renderCart();
    }
});

document.querySelector('.cart-section').addEventListener('click', (e) => {
    if (e.target.classList.contains('view-cart') || e.target.classList.contains('hide-cart')) {
        toggleCart();
        renderCart();
    }

    if (e.target.classList.contains('cart-checkout')) {
        checkout();
        renderCart();
    }
});

document.querySelector('.cart-section').addEventListener('change', (e) => {
    if (e.target.classList.contains('label-input')) {
        const productIndex = e.target.dataset.productId;
        updateQuantity(productIndex, e.target.value);
        renderCart();
    }
});

renderProducts();
renderCart();