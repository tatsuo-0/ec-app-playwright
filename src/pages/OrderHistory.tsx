import { getOrders } from "../store/orderStore";

export default function OrderHistory() {
    const orders = getOrders();

    if (orders.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <p data-testid="no-orders" className="text-muted">
                    注文履歴がありません
                </p>
            </div>
        );
    }
    return (
        <div className="container mt-5">
            <h1 className="mb-4" data-testid="order-history-title">注文履歴</h1>
            {orders.map((order) => (
                <div key={order.id} className="card mb-3 p-3" data-testid={`order-${order.id}`}>
                    <p data-testid={`order-date-${order.id}`}>
                        注文日時: {new Date(order.orderedAt).toLocaleString()}
                    </p>
                    <ul>
                        {order.items.map((item) =>(
                            <li key={item.id}>
                                {item.name} × {item.quantity}
                            </li>
                        ))}
                    </ul>
                    <p data-testid={`order-total-${order.id}`}>合計金額: ¥{order.total}</p>
                </div>
            ))}
        </div>
    );
}