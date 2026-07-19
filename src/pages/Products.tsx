import { useEffect, useState } from "react";
import { getProducts , type Product } from "../api/fakeApi";
import ProductCard from "../components/ProductCard";
import { addToCart } from "../store/cartStore";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null); // トーストメッセージ
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  // メッセージ表示後、自動で消す
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  if (loading) {
    return (
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: 300 }}
      >
        <div className="spinner-border" data-testid="loading" />
      </div>
    );
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setMessage(`${product.name} をカートに追加しました！`);
    setShowToast(true);
  };

  return (
    <div className="container mt-5 position-relative">
      <h1 className="mb-4" data-testid="page-title">
        Products
      </h1>

      {/* トースト風通知 */}
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

      <div className="row g-4">
        {products.map((p) => (
          <div key={p.id} className="col-12 col-md-4 d-flex">
            <ProductCard product={p} onAdd={() => handleAddToCart(p)} />
          </div>
        ))}
      </div>
    </div>
  );
}