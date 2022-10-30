import { User } from "./User";

export interface Order {
    price: number;
    expirationDate?: Date;
    user?: User;
}