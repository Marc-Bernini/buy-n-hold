import { Order } from "../interfaces/Order";
import * as api from "./api";


export const createOrder = (order: Order, token: string | null) => {
    return api.post(order, "order", token);
}