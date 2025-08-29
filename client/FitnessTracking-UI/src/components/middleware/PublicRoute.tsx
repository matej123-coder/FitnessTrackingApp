import {JSX} from "react";
import {useAuth} from "../../lib/hooks/useAuth.ts";
import {isValidToken} from "../../lib/utils/jwtValidToken.ts";
import {Navigate} from "react-router-dom";

export default function PublicRoute({children}:{children:JSX.Element}){
    const {token} = useAuth();
    if(isValidToken(token)) return <Navigate to={"/dashboard"} replace/>
    return children
}