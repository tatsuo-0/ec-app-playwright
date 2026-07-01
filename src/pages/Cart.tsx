import { useState } from "react";
import { getCart, removeFromCart, decreaseQuantity, increaseQuantity } from "../store/cartStore";

export default function Cart() {
  const [cart, setCart] = useState(getCart());

  const handleRemove = (id: number) => {
    removeFromCart(id);
    setCart(getCart());
  };

  const handleIncrease = (id: number) => {
    increaseQuantity(id);
    setCart(getCart());
  };

  const handleDecrease = (id: number) => {
    decreaseQuantity(id);
    setCart(getCart());
  };

  if (cart.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <p data-testid="empty-cart" className="text-muted">
          Cart is empty
        </p>
      </div>
    );
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mt-5">
      <h1 className="mb-4" data-testid="cart-title">Cart</h1>

      <div className="list-group mb-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
            data-testid={`cart-item-${item.id}`}
          >
            <div>
              <span data-testid="cart-item-name">{item.name}</span>
              <span className="mx-2">× {item.quantity}</span>
              <span data-testid="cart-item-price">¥{item.price * item.quantity}</span>
            </div>
            <div>
              <button
                className="btn btn-sm btn-secondary me-1"
                onClick={() => handleDecrease(item.id)}
                data-testid={`decrease-${item.id}`}
              >
                -
              </button>
              <button
                className="btn btn-sm btn-secondary me-1"
                onClick={() => handleIncrease(item.id)}
                data-testid={`increase-${item.id}`}
              >
                +
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleRemove(item.id)}
                data-testid={`remove-${item.id}`}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-end">
        <h4 data-testid="total-price">Total: ¥{total}</h4>
      </div>
    </div>
  );
}