import React, { useEffect, useState } from "react";
import axios from "axios";
import "./userOrders.scss";

interface Product {
    id: number;
    title: string;
    price: number;
    img: string;
}

interface OrderItem {
    id: number;
    quantity: number;
    priceAtPurchase: number;
    product: Product;
}

interface Order {
    id: number;
    status: "Pendiente" | "Completado" | "Cancelado";
    total: number;
    createdAt: string;
    items: OrderItem[];
}

const UserOrders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");


    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/order/user`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOrders(
                    response.data.orders.map((order: Order) => ({
                        ...order,
                        total: typeof order.total === "number" ? order.total : 0,
                    }))
                );
            } catch (err) {
                setError("Error al obtener las órdenes");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [token]);

    if (loading) return <p>Cargando órdenes...</p>;
    if (error) return <p>{error}</p>;
    if (orders.length === 0) return <p>No tienes órdenes todavía.</p>;

    console.log("Órdenes recibidas:", orders);

    const sortedOrders = [...orders].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    return (
        <div className="container">
            <h1>Tus Órdenes</h1>
            <div className="orderSort">
                <label htmlFor="sort">Ordenar por fecha: </label>
                <select
                    id="sort"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
                >
                    <option value="desc">Más recientes primero</option>
                    <option value="asc">Más antiguas primero</option>
                </select>
            </div>
            {sortedOrders.map((order) => (
                <div key={order.id} className="orderCard">
                    <div className="orderHeader">
                        <p className="orderInfo">
                            <strong>Orden ID:</strong> {order.id}
                        </p>
                        <p className="orderInfo">
                            <strong>Estado:</strong> {order.status}
                        </p>
                        <p className="orderInfo">
                            <strong>Fecha:</strong> {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                        <p className="total">${order.total.toFixed(2)}</p>
                    </div>

                    <ul className="itemList">
                        {order.items.map((item) => (
                            <li key={item.id} className="item">
                                <img
                                    src={item.product.img}
                                    alt={item.product.title}
                                    className="itemImg"
                                />
                                <span className="itemText">
                                    {item.product.title} x {item.quantity} —
                                </span>
                                <span className="itemPrice">
                                    {typeof item.priceAtPurchase === "number"
                                        ? `$${item.priceAtPurchase.toFixed(2)}`
                                        : "$0.00"}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default UserOrders;
