import apiClient from "../api/apiClient.ts";

export class DailyTrackingService{
    static async getAllDaily(pageSize:number,pageNo:number):Promise<DailyTrackingResponsePage>{
        const res = await apiClient.get(`/dailies?pageNo=${encodeURIComponent(pageNo)}&pageSize=${encodeURIComponent(pageSize)}`)
        return res.data;
    }
    static async createDaily(data:DailyTrackingDto):Promise<void>{
        const res = await apiClient.post(`/dailies/create`,data);
        return res.data;
    }
    static async editDaily(data:DailyTrackingDto,id:number):Promise<void>{
        const res = await apiClient.put(`/dailies/update/${id}`,data);
        return res.data;
    }
    static async getDaily(id:number):Promise<DailyTrackingResponse>{
        const res = await apiClient.get(`/dailies/${id}`);
        return res.data;
    }
    static async deleteDaily(id:number):Promise<void>{
        const res = await apiClient.delete(`/dailies/delete/${id}`)
        return res.data;
    }
}