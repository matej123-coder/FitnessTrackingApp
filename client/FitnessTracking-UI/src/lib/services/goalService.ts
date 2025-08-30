import apiClient from "../api/apiClient.ts";

export class GoalService{
    static async getAllGoals(pageSize:number,pageNo:number,searchParam:string):Promise<GoalResponsePage>{
        const res =await apiClient.get(`/goals?pageSize=${encodeURIComponent(pageSize)}&pageNo=${encodeURIComponent(pageNo)}&searchParam=${encodeURIComponent(searchParam)}`)
        return res.data
    }
    static async getGoal(id:number):Promise<GoalResponse>{
        const res = await apiClient.get(`/goals/${id}`)
        return res.data;
    }
    static async createGoal(data:GoalDto):Promise<void>{
        const res = await apiClient.post(`/goals/create`,data)
        return res.data;
    }
    static async updateGoal(data:GoalDto,id:number):Promise<void>{
        const res = await apiClient.put(`/goals/update/${id}`,data)
        return res.data;
    }
    static async deleteGoal(id:number):Promise<void>{
        const res = await apiClient.delete(`/goals/delete/${id}`)
        return res.data
    }
}