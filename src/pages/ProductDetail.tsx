import { useEffect, useState } from "react";
import { getProductById , type Product } from "../api/fakeApi";
import { addToCart } from "../store/cartStore";
import { useParams , Link } from "react-router-dom";

export default function ProductDetail() {
    const [product, setProduct] = useState<Product | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);
    const {id} = useParams();

    useEffect(() => {
    getProductById(Number(id)).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setMessage(`${product.name} をカートに追加しました！`);
    setShowToast(true);
  };

  if (loading) {
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: 300 }}>
        <div className="spinner-border" data-testid="loading" />
        </div>
    );
  }
  if(product === undefined){
      return (
      <div className="container mt-5 position-relative">
        <h1 className="mb-4" data-testid="detail-title">
          商品が見つかりません
        </h1>  
      </div>
    );
  }
  return (
      <div className="container mt-5 position-relative">
        {showToast && message && (
          <div
            className="toast show position-absolute top-0 end-0 m-3"
            role="alert"
            data-testid="add-message"
            style={{ zIndex: 1050 }}
          >
            <div className="toast-body">{message}</div>
          </div>
        )}

        <div className="card shadow p-4 mx-auto" style={{ maxWidth: 480 }}>
          <h1 className="h3 mb-3" data-testid="detail-title">
            {product.name}
          </h1>
          <p className="fs-4 fw-bold mb-3" data-testid="product-price">
            ¥{product.price}
          </p>
          <p className="text-muted mb-4" data-testid="product-description">
            {product.description}
          </p>

          <button
            className="btn btn-primary w-100 mb-2"
            data-testid={`add-cart-${product.id}`}
            onClick={() => handleAddToCart(product)}
          >
            Add to cart
          </button>

          <Link to="/cart" className="btn btn-outline-secondary w-100" data-testid="cart-link">
            Cart
          </Link>
        </div>
      </div>
    );
}
