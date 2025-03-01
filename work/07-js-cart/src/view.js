import { products, state, getCartTotal, getTotalItems } from "./model";

const renderProducts = () => {
    const container = document.querySelector('.products-container');
    
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <img class="product-image" src="${product.image}" alt="${product.name}">
            <h2 class="product-name">${product.name}</h2>
            <p class="product-price">$${product.price}</p>
            <button class="product-add" data-product-id="${product.id}"> 
                Add to Cart
            </button>
        </div>
    `).join('');
};

const renderCart = () => {
    const totalItems = getTotalItems();
    const cartContainer = document.querySelector('.cart-section');

    if (!state.isCartVisible) {
        cartContainer.innerHTML = `
            <button class="view-cart">View Cart${totalItems > 0 ? `(${totalItems})` : ''}</button>
        `;
        return;
    }

    const cartItems = Object.entries(state.cart).map(([productIndex, quantity]) => {
        const index = parseInt(productIndex);
        const product = products[index];
        const total = (product.price * quantity).toFixed(2);

        return `
            <div class="cart-item">
                <img class="item-image" src="${product.image}" alt="${product.name}">
                <span class="item-name">${product.name}</span>
                <label class="item-label" for="quantity">
                    <span class="label-name">Quantity: </span>
                    <input class="label-input" type="number" min="0" value="${quantity}" name="quantity" id="quantity" data-product-id="${productIndex}">
                </label>
                <span class="item-total">Total: $${total}</span>
            </div>
        `;
    }).join('');

    cartContainer.innerHTML = `
        <div class="cart-content">
            <h2 class="cart-title">Shopping Cart</h2>
            ${cartItems.length ? cartItems : '<p class="nothing">Nothing in the cart</p>'}
            <button class="hide-cart">Hide Cart</button>
            ${cartItems.length ? `
                <span class="cart-total">Total: $${getCartTotal().toFixed(2)}</span>
                <button class="cart-checkout">Checkout</button>
            ` : ''}            
        </div>
    `;
};


export { renderProducts, renderCart };
