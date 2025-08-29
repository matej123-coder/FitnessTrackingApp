import {createContext, ReactNode, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthService} from "../services/authService.ts";
import {getUserId, isValidToken} from "../utils/jwtValidToken.ts";

interface AuthContextType {
    user: number | null;
    token: string | null;
    login: (values: LoginDto) => Promise<LoginResponse>;
    logout: () => void;
    signup: (data: RegisterUserDto) => Promise<void>;
    verify: (data: VerificationDto) => Promise<number | null>;
    resetPassword: (data: ResetPasswordDto) => Promise<void>;
    forgotPassword: (data: ChangedPasswordDto) => Promise<void>
    resend: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [user, setUser] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isValidToken(token) && token) {
            localStorage.setItem("token", token);
            setUser(getUserId(token));
        } else localStorage.removeItem("token");
    }, [token]);

    const login = async (values: LoginDto): Promise<LoginResponse> => {
        try {
            const res = await AuthService.login(values);
            setToken(res.jwtToken);
        } catch (error) {
            console.error("Login failed", error)
            throw error
        }

    };
    const resend = async (email: string): Promise<void> => {
        try {
            await AuthService.resend(email);
        } catch (error) {
            console.error("Resend code failed", error)
            throw error
        }
    }

    const signup = async (data: RegisterUserDto) => {
        try {
            await AuthService.signup(data);

        } catch (error) {
            console.error("Signup failed", error);
            throw error;
        }
    };
    const resetPassword = async (data: ResetPasswordDto) => {
        try {
            await AuthService.resetPassword(data);
        } catch (error) {
            console.error("Reset password failed", error);
            throw error;
        }
    }
    const forgotPassword = async (data: ChangedPasswordDto) => {
        try {
            await AuthService.changePassword(data);
        } catch (error) {
            console.error("Reset password failed", error);
            throw error;
        }
    }

    const verify = async (data: VerificationDto): Promise<number | null> => {
        try {
            const res = await AuthService.verifyUser(data)
            return res.estimatedCalorieIntake;
        } catch (error) {
            console.error("Verification failed", error)
            throw error
        }


    };

    const logout = () => {
        setToken(null);
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider
            value={{user, token, login, logout, signup, verify, resetPassword, forgotPassword, resend}}>
            {children}
        </AuthContext.Provider>
    );
};


