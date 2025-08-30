import apiClient from "../api/apiClient.ts";

export class MealsService{
    static async getAllMeals(pageSize:number,pageNo:number,searchParam:string):Promise<MealsResponsePage>{
        const res = await apiClient.get(`/meals?pageNo=${encodeURIComponent(pageNo)}&pageSize=${encodeURIComponent(pageSize)}&searchParam=${encodeURIComponent(searchParam)}`)
        return res.data;
    }
    static async createMeal(data:MealDto):Promise<void>{
         const res = await apiClient.post(`/meals/create`,data);
         return res.data;
    }
    static async editMeal(data:MealDto,id:number):Promise<void>{
        const res = await apiClient.put(`/meals/update/${id}`,data);
        return res.data;
    }
    static async getMeal(id:number):Promise<MealResponse>{
        const res = await apiClient.get(`/meals/${id}`);
        return res.data;
    }
    static async deleteMeal(id:number):Promise<void>{
        const res = await apiClient.delete(`/meals/delete/${id}`)
        return res.data;
    }
}