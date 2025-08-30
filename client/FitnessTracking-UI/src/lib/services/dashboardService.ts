import apiClient from "../api/apiClient.ts";

export class DashboardService{
    static async dashboardData(period:string):Promise<DashboardData>{
        const res = await apiClient.get(`/dashboard?period=${encodeURIComponent(period)}`)
        return res.data;
    }
}