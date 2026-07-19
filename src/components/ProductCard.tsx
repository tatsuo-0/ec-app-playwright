import { Link } from "react-router-dom";
import { type Product } from "../api/fakeApi";

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

      <Link to="/cart" className="btn btn-outline-secondary w-100 mb-2" data-testid="cart-link">
        Cart
      </Link>

      <Link to={`/products/${product.id}`} className="btn btn-outline-secondary w-100" data-testid={`products-detail-link-${product.id}`}>
        ProductDetail
      </Link>
    </div>
  );
}