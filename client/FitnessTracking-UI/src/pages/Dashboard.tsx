import {useAuth} from "../lib/hooks/useAuth.ts";
import {NavBar} from "../components/NavBar.tsx";
import {AnimationComponent} from "../components/AnimationComponent.tsx";

export default function Dashboard() {
    const {logout} = useAuth()
    const handleLogout = ()=>{
        console.log("Hello")
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-x-hidden">
            <AnimationComponent/>
            <NavBar/>
            <h1>Home</h1>
            <button onClick={handleLogout}>Hello</button>
        </div>
    )
}