import {AnimationComponent} from "../components/AnimationComponent.tsx";
import {NavBar} from "../components/NavBar.tsx";
import {GoalForm} from "../components/GoalForm.tsx";

export const AddGoal = ()=>{
    return(
        <div
            className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-x-hidden">
            <AnimationComponent/>
            <NavBar/>
            <GoalForm/>
        </div>
    )
}