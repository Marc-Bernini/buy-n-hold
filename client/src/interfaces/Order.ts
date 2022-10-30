import { User } from "./User";

export interface Order {
    price: number | string;
    expirationDate?: Date;
    user?: User;
}