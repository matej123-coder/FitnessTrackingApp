import {useEffect, useState} from "react";

export const AnimationComponent = () => {
    const [scrollY, setScrollY] = useState(0);
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (

        <div className="fixed inset-0 z-0">
            <div
                className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
                style={{transform: `translateY(${scrollY * 0.1}px)`}}
            ></div>
            <div
                className="absolute top-40 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"
                style={{transform: `translateY(${scrollY * 0.15}px)`}}
            ></div>
            <div
                className="absolute bottom-20 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"
                style={{transform: `translateX(-50%) translateY(${scrollY * 0.05}px)`}}
            ></div>
        </div>
    )
}