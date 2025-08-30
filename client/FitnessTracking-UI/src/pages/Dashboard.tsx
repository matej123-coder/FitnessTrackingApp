import {NavBar} from "../components/NavBar.tsx";
import {AnimationComponent} from "../components/AnimationComponent.tsx";
import {RingProgress} from "@mantine/core";
import {DashboardComponent} from "../components/DashboardComponent.tsx";

export default function Dashboard() {

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-x-hidden">
            <AnimationComponent/>
            <NavBar/>
            <DashboardComponent/>
        </div>
    )
}