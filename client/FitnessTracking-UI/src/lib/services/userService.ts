import apiClient from "../api/apiClient.ts";

export class UserService {
    static async getUser(id: number): Promise<UserResponse> {
        const res = await apiClient.get(`/user/${id}`)
        return res.data
    }
    static async deleteUser(id:number){
        const res = await apiClient.delete(`/user/delete/${id}`)
        return res.data;
    }
}