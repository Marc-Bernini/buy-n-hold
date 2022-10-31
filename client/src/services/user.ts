import * as apiService from "./api";

export const getUsers = (token: string | null) => {
    return apiService.get("user", token);
}