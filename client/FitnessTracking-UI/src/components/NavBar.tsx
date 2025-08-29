import {Menu, X, Zap} from "lucide-react";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {UserService} from "../lib/services/userService.ts";
import {AxiosError} from "axios";
import {notifications} from "@mantine/notifications";
import {useAuth} from "../lib/hooks/useAuth.ts";

export const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="relative z-50 px-6 py-4 backdrop-blur-md bg-white/5 border-b border-white/10">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link to={"/dashboard"}>
                    <div className="flex items-center space-x-2">
                        <div
                            className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                            <Zap className="w-6 h-6 text-white"/>
                        </div>
                        <span
                            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            FitTrack Pro
                        </span>
                    </div>
                </Link>


                <div className="hidden md:flex items-center space-x-8">
                    <Link to={"/meals"} className="text-gray-300 hover:text-white transition-colors duration-300">
                        Meals
                    </Link>
                    <Link to={"/dailyTracking"}
                          className="text-gray-300 hover:text-white transition-colors duration-300">
                        Daily Tracking
                    </Link>
                    <Link to={"/workoutSessions"}
                          className="text-gray-300 hover:text-white transition-colors duration-300">
                        Workout Session
                    </Link>
                    <Link to={"/goals"} className="text-gray-300 hover:text-white transition-colors duration-300">
                        Goals
                    </Link>
                    <Link to={"/profile"}>
                        <button
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105">
                            Profile
                        </button>
                    </Link>
                </div>

                <button
                    className="md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                </button>
            </div>
            {isMenuOpen && (
                <div
                    className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/10 p-6">
                    <div className="flex flex-col space-y-4">
                        <Link to={"/meals"} className="text-gray-300 hover:text-white transition-colors duration-300">
                            Meals
                        </Link>
                        <Link to={"/dailyTracking"}
                              className="text-gray-300 hover:text-white transition-colors duration-300">
                            Daily Tracking
                        </Link>
                        <Link to={"/workoutSessions"}
                              className="text-gray-300 hover:text-white transition-colors duration-300">
                            Workout Session
                        </Link>
                        <Link to={"/goals"} className="text-gray-300 hover:text-white transition-colors duration-300">
                            Goals
                        </Link>
                        <Link to={"/profile"}>
                            <button
                                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105">
                                Profile
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </nav>

    )
}