import { Link } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd?: () => void;
}) {
  return (
    <div className="card w-100 h-100 p-3" data-testid={`product-${product.id}`}>
      <h3 className="card-title" data-testid="product-name">
        {product.name}
      </h3>
      <p className="card-text" data-testid="product-price">
        ¥{product.price}
      </p>

      <button
        className="btn btn-primary w-100 mb-2"
        data-testid={`add-cart-${product.id}`}
        onClick={onAdd}
      >
        Add to cart
      </button>

      <Link to="/cart" className="btn btn-outline-secondary w-100" data-testid="cart-link">
        Cart
      </Link>
    </div>
  );
}