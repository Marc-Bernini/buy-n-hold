import { Order } from "../interfaces/Order";
import * as api from "./api";

export const createOrder = (order: Order, token: string | null) => {
    return api.post(order, "order", token);
}

export const getOrders = (token: string | null) => {
    return api.get("order", token);
}

export const updateOrders = (orders: Array<Order>, token: string | null) => {
    return api.put(orders, "order", token);
}

export const deleteOrder = (id: number, token: string | null) => {
    return api.destroy(id, "order", token);
}