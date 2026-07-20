import { getCart, clearCart, type CartItem } from "./cartStore";

export type Order = {
  id: number;
  items: CartItem[];
  total: number;
  orderedAt: string;
};

const ORDERS_KEY = "orders";

export function getOrders(): Order[] {
  const data = localStorage.getItem(ORDERS_KEY);
  return data ? JSON.parse(data) : [];
}

export function placeOrder(): Order {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order: Order = {
    id: Date.now(),
    items: cart,
    total,
    orderedAt: new Date().toISOString(),
  };

  const orders = getOrders();
  orders.push(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

  clearCart();
  return order;
}
