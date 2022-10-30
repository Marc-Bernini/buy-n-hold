import { Order } from "./Order";

export interface User {
    username?: string;
    password?: string;
    Orders?: Array<Order>;
}