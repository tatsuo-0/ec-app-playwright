type Product = {
  id: number;
  name: string;
  price: number;
};

type CartItem = Product & { quantity: number };

const CART_KEY = "cart";

export function getCart(): CartItem[] {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
}

// 追加: 数量も管理
export function addToCart(product: Product) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// 削除（全数量削除）
export function removeFromCart(id: number) {
  const cart = getCart();
  const updated = cart.filter((item) => item.id !== id);
  localStorage.setItem(CART_KEY, JSON.stringify(updated));
}

// 数量を減らす（1個ずつ）
export function decreaseQuantity(id: number) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (item) {
    item.quantity -= 1;
    if (item.quantity <= 0) {
      return removeFromCart(id);
    }
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }
}

// 数量を増やす（1個ずつ）
export function increaseQuantity(id: number) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (item) {
    item.quantity += 1;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }
}

// カート空にする
export function clearCart() {
  localStorage.removeItem(CART_KEY);
}