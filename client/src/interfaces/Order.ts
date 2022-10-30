import { User } from "./User";

export interface Order {
    price: number | string;
    id?: number;
    expirationDate?: Date;
    user?: User;
}