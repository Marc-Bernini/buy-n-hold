import { User } from "../interfaces/User";
import * as api from "./api";


export const createAndLogin = (user: User) => {
    return api.post(user, "user");
}