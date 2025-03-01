const products = [
    {
        id: 0,
        name: 'Jorts',
        price: 0.99,
        image: 'http://placehold.co/150x150?text=Jorts'
    },
    {
        id: 1,
        name: 'Jean',
        price: 3.14,
        image: 'http://placehold.co/150x150?text=Jean',
    },
    {
        id: 2,
        name: 'Nyancat',
        price: 2.73,
        image: 'http://placehold.co/150x150?text=Nyancat'
    }
];

const state = {
    cart: {},
    isCartVisible: false
};

const addToCart = (productIndex) => {
    if (!state.cart[productIndex]) {
        state.cart[productIndex] = 0;
    }
    state.cart[productIndex]++;
};

const updateQuantity = (productIndex, quantity) => {
    const newQuantity = parseInt(quantity);

    if (newQuantity > 0) {
        state.cart[productIndex] = newQuantity;
    } else {
        delete state.cart[productIndex];
    }
};

const checkout = () => {
    state.cart = {};
    state.isCartVisible = false;
};

const toggleCart = () => {
    state.isCartVisible = !state.isCartVisible;
};

const getCartTotal = () => {
    let total = 0;
    
    for (const [productIndex, quantity] of Object.entries(state.cart)) {
        const index = parseInt(productIndex);
        const product = products[index];

        if (product) {
            total += product.price * quantity;
        }
    }
    
    return total;
};

const getTotalItems = () => {
    let sum = 0;

    for (const quantity of Object.values(state.cart)) {
        sum += quantity;
    }

    return sum;
};

export {
    products,
    state,
    addToCart,
    updateQuantity,
    checkout,
    toggleCart,
    getCartTotal,
    getTotalItems
};


