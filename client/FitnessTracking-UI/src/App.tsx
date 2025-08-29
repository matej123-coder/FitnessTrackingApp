import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import {AuthProvider} from "./lib/providers/AuthProvider.tsx";
import VerifyUser from "./pages/VerifyUser.tsx";
import SignInPage from "./pages/SignInPage.tsx";
import ProtectedRoute from "./components/middleware/ProtectedRoute.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import {JSX} from "react"
import {ChangePassword} from "./pages/ChangePassword.tsx";
import PublicRoute from "./components/middleware/PublicRoute.tsx";
import {Meals} from "./pages/Meals.tsx";
import {AddMealPage} from "./pages/AddMealPage.tsx";
import {EditMealPage} from "./pages/EditMealPage.tsx";
import {Goals} from "./pages/Goals.tsx";
import {AddGoal} from "./pages/AddGoal.tsx";
import EditGoal from "./pages/EditGoal.tsx";
import WorkoutSession from "./pages/WorkoutSession.tsx";
import AddWorkout from "./pages/AddWorkout.tsx";
import {EditWorkout} from "./pages/EditWorkout.tsx";
import {DailyTrackingAdd} from "./pages/DailyTrackingAdd.tsx";
import {Daily} from "./pages/Daily.tsx";
import {DailyTrackingEdit} from "./pages/DailyTrackingEdit.tsx";
import {Profile} from "./pages/Profile.tsx";

function App() {

    return (

        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path={"/dashboard"} element={
                        <ProtectedRoute>
                            <Dashboard/>
                        </ProtectedRoute>
                    }/>
                    <Route path={"/landing"} element={<LandingPage/>}/>
                    <Route path={"/register"} element={<PublicRoute><SignupPage/></PublicRoute>}/>
                    <Route path={"/verify"} element={<PublicRoute><VerifyUser/></PublicRoute>}/>
                    <Route path={"/login"} element={<PublicRoute><SignInPage/></PublicRoute>}/>
                    <Route path={"/meals"} element={<ProtectedRoute><Meals/></ProtectedRoute>}/>
                    <Route path={"/edit-meal"} element={<ProtectedRoute><EditMealPage/></ProtectedRoute>}/>
                    <Route path={"/goals"} element={<ProtectedRoute><Goals/></ProtectedRoute>}/>
                    <Route path={"/workoutSessions"} element={<ProtectedRoute><WorkoutSession/></ProtectedRoute>}/>
                    <Route path={"/add-goal"} element={<ProtectedRoute><AddGoal/></ProtectedRoute>}/>
                    <Route path={"/add-workout"} element={<ProtectedRoute><AddWorkout/></ProtectedRoute>}/>
                    <Route path={"/viewHistory"} element={<ProtectedRoute><Daily/></ProtectedRoute>}/>
                    <Route path={"/dailyTracking"} element={<ProtectedRoute><DailyTrackingAdd/></ProtectedRoute>}/>
                    <Route path={"/edit-daily"} element={<ProtectedRoute><DailyTrackingEdit/></ProtectedRoute>}/>
                    <Route path={"/edit-workout"} element={<ProtectedRoute><EditWorkout/></ProtectedRoute>}/>
                    <Route path={"/edit-goal"} element={<ProtectedRoute><EditGoal/></ProtectedRoute>}/>
                    <Route path={"/add-meal"} element={<ProtectedRoute><AddMealPage/></ProtectedRoute>}/>
                    <Route path={"/profile"} element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
                    <Route path={"/forgot-password"} element={<PublicRoute><ForgotPassword/></PublicRoute>}/>
                    <Route path={"/change-password"} element={<PublicRoute><ChangePassword/></PublicRoute>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
