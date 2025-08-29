import apiClient from "../api/apiClient.ts";

export class AuthService{
    static async signup(data:RegisterUserDto){
       const res = await apiClient.post<void>("/auth/signup",data)
        return res.data;
    }
    static async verifyUser(data:VerificationDto):Promise<RegisterResponse>{
        const res  =await apiClient.post("/auth/verify-user",data);
        return res.data;
    }
    static async login(data:LoginDto):Promise<LoginResponse>{
        const res = await apiClient.post("/auth/login",data);
        return res.data;
    }
    static async resetPassword(data:ResetPasswordDto){
        const res = await apiClient.post("/auth/reset-password",data)
        return res.data;
    }
    static async changePassword(data:ChangedPasswordDto){
        const res = await apiClient.post("/auth/change-password",data)
        return res.data;
    }
    static async resend(email:string){
        const res = await apiClient.post(`/auth/resend?email=${encodeURIComponent(email)}`)
        return res.data;
    }
}