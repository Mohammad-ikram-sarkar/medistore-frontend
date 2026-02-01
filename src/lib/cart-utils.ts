export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  brand: string;
}

export const cartUtils = {
  // Get cart from localStorage
  getCart: (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem("cart") || "[]");
  },

  // Save cart to localStorage
  saveCart: (cart: CartItem[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  },

  // Add item to cart
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity: number = 1): void => {
    const cart = cartUtils.getCart();
    const existingItem = cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...item, quantity });
    }

    cartUtils.saveCart(cart);
  },

  // Remove item from cart
  removeFromCart: (itemId: string): void => {
    const cart = cartUtils.getCart();
    const updatedCart = cart.filter(item => item.id !== itemId);
    cartUtils.saveCart(updatedCart);
  },

  // Update item quantity
  updateQuantity: (itemId: string, quantity: number): void => {
    const cart = cartUtils.getCart();
    const item = cart.find(cartItem => cartItem.id === itemId);
    
    if (item) {
      if (quantity <= 0) {
        cartUtils.removeFromCart(itemId);
      } else {
        item.quantity = quantity;
        cartUtils.saveCart(cart);
      }
    }
  },

  // Clear entire cart
  clearCart: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));
  },

  // Get total items count
  getTotalItems: (): number => {
    const cart = cartUtils.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  },

  // Get total price
  getTotalPrice: (): number => {
    const cart = cartUtils.getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
};