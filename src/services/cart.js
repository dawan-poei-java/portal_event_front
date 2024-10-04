const CART_STORAGE_KEY = "cart";

const getStoredCart = () => {
  const savedCart = sessionStorage.getItem(CART_STORAGE_KEY);
  return savedCart ? JSON.parse(savedCart) : [];
};

const setStoredCart = (cart) => {
  sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

let cart = getStoredCart();

const cartService = {
  getCart: () => cart,

  addToCart: (item) => {
    cart = [...cart, item];
    setStoredCart(cart);
  },

  removeFromCart: (index) => {
    cart.pop(index);
    setStoredCart(cart);
  },

  clearCart: () => {
    cart = [];
    setStoredCart(cart);
  },
};

export default cartService;
