import { Navigate } from "react-router-dom";
import { useAuth } from "../../lib/hooks/useAuth.ts"
import {JSX} from "react";
import {isValidToken} from "../../lib/utils/jwtValidToken.ts";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { token } = useAuth();
    if (!isValidToken(token)) return <Navigate to="/login" replace />;
    return children;
}
