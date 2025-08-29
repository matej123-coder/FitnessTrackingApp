import {jwtDecode} from "jwt-decode";

interface JwtPayload {
    exp: number;
    userId:number;
    [key: string]: any;
}

export const isValidToken = (token: string | null): boolean => {
    if (!token) return false;

    try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        const expirationTime = decodedToken.exp * 1000;
        const now = Date.now();

        return expirationTime > now;
    } catch (error) {
        console.error("Invalid token", error);
        return false;
    }

}
export const getUserId = (token: string | null) => {
    if (!token){
        return null;
    }
    try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        return decodedToken.userId ?? null;
    } catch (error) {
        console.error("Cannot retrieve userId", error)
    }

}