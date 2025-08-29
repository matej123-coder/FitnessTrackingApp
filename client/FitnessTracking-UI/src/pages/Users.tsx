import {AnimationComponent} from "../components/AnimationComponent.tsx";
import {NavBar} from "../components/NavBar.tsx";
import {MealTable} from "../components/MealTable.tsx";
import {UsersTable} from "../components/UsersTable.tsx";

export function Users(){
    return(
        <div
            className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-x-hidden">
            <AnimationComponent/>
            <NavBar/>
            <UsersTable/>
        </div>
    )
}