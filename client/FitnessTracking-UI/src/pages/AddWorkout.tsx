import {AnimationComponent} from "../components/AnimationComponent.tsx";
import {NavBar} from "../components/NavBar.tsx";
import {WorkoutForm} from "../components/WorkoutForm.tsx"
export default function AddWorkout(){
    return(
        <div
            className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-x-hidden">
            <AnimationComponent/>
            <NavBar/>
            <WorkoutForm/>
        </div>
    )
}