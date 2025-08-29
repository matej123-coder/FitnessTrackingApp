import apiClient from "../api/apiClient.ts";

export class WorkoutService{
    static async getAllWorkouts():Promise<WorkoutResponse[]>{
        const res = await apiClient.get(`/workouts`);
        return res.data;
    }
    static async getWorkout(id:number):Promise<WorkoutResponse>{
        const res = await apiClient.get(`/workouts/${id}`)
        return res.data;
    }
    static async createWorkout(data:WorkoutSessionDto){
        const res = await apiClient.post("/workouts/create",data)
        return res.data;
    }
    static async updateWorkout(data:WorkoutSessionDto,id:number){
        const res = await apiClient.put(`/workouts/update/${id}`,data)
        return res.data;
    }
    static async deleteWorkout(id:number):Promise<void>{
        const res = await apiClient.delete(`/workouts/delete/${id}`)
        return res.data;
    }
}