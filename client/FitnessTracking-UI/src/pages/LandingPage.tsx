import {useEffect, useState} from 'react';
import {ArrowRight, Heart, Menu, Smartphone, Star, Target, TrendingUp, Trophy, Users, X, Zap} from 'lucide-react';
import {Link} from "react-router-dom";
import {AnimationComponent} from "../components/AnimationComponent.tsx";

const LandingPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const features = [
        {
            icon: <Heart className="w-8 h-8"/>,
            title: "Smart Health Tracking",
            description: "Monitor heart rate, calories, and vital stats with AI-powered insights"
        },
        {
            icon: <Target className="w-8 h-8"/>,
            title: "Goal Setting & Achievement",
            description: "Set personalized goals and track your progress with gamified rewards"
        },
        {
            icon: <TrendingUp className="w-8 h-8"/>,
            title: "Advanced Analytics",
            description: "Detailed progress reports and performance analytics to optimize your workouts"
        },
        {
            icon: <Users className="w-8 h-8"/>,
            title: "Social Community",
            description: "Connect with friends, share achievements, and stay motivated together"
        }
    ];

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Marathon Runner",
            avatar: "SJ",
            rating: 5,
            text: "FitTrack Pro completely transformed my training routine. The insights are incredible!"
        },
        {
            name: "Mike Chen",
            role: "Personal Trainer",
            avatar: "MC",
            rating: 5,
            text: "I recommend this to all my clients. The progress tracking is unmatched."
        },
        {
            name: "Emily Rodriguez",
            role: "Yoga Instructor",
            avatar: "ER",
            rating: 5,
            text: "Perfect for tracking mindful movement and meditation sessions."
        }
    ];

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-x-hidden">
            <AnimationComponent/>

            <nav className="relative z-50 px-6 py-4 backdrop-blur-md bg-white/5 border-b border-white/10">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
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

                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features"
                           className="text-gray-300 hover:text-white transition-colors duration-300">Features</a>
                        <a href="#testimonials"
                           className="text-gray-300 hover:text-white transition-colors duration-300">Reviews</a>
                        <Link to={"/register"}>
                            <button
                                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105">
                                Get Started
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

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div
                        className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/10 p-6">
                        <div className="flex flex-col space-y-4">
                            <a href="#features"
                               className="text-gray-300 hover:text-white transition-colors">Features</a>
                            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
                            <a href="#testimonials"
                               className="text-gray-300 hover:text-white transition-colors">Reviews</a>
                            <Link to={"/register"}>
                                <button
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-2 rounded-full w-full">
                                    Get Started
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="relative z-10 px-6 py-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div
                                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                                <Trophy className="w-5 h-5 text-yellow-400"/>
                                <span className="text-sm">Rated #1 Fitness App 2024</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                                Transform Your
                                <span
                                    className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                  {" "}Fitness Journey
                </span>
                            </h1>

                            <p className="text-xl text-gray-300 leading-relaxed">
                                Track, analyze, and optimize your workouts with AI-powered insights.
                                Join millions who've transformed their health with FitTrack Pro.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to={"/register"}>
                                    <button
                                        className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                                        <span>Get Started</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
                                    </button>
                                </Link>
                            </div>

                            <div className="flex items-center space-x-6 text-sm text-gray-400">
                                <div className="flex items-center space-x-1">
                                    <Users className="w-4 h-4"/>
                                    <span>2M+ Users</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400"/>
                                    <span>4.9/5 Rating</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Smartphone className="w-4 h-4"/>
                                    <span>iOS & Android</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            {/* Floating Cards */}
                            <div
                                className="relative z-10 bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-semibold">Today's Progress</h3>
                                        <Heart className="w-6 h-6 text-red-400 animate-pulse"/>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-300">Steps</span>
                                            <span className="text-2xl font-bold text-green-400">8,947</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full w-3/4 animate-pulse"></div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-300">Calories</span>
                                            <span className="text-2xl font-bold text-orange-400">1,247</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-orange-400 to-red-400 h-2 rounded-full w-2/3 animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="absolute -top-8 -right-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-4 transform -rotate-12 hover:rotate-0 transition-transform duration-500">
                                <Trophy className="w-8 h-8 text-white"/>
                            </div>

                            <div
                                className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-4 transform rotate-12 hover:rotate-0 transition-transform duration-500">
                                <TrendingUp className="w-8 h-8 text-white"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="relative z-10 px-6 py-20 bg-black/20 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Powerful Features for
                            <span
                                className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Every Goal</span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Everything you need to track, analyze, and achieve your fitness goals in one beautiful app.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group bg-white/5 backdrop-blur-sm hover:bg-white/10 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 transform hover:-translate-y-2"
                                // onMouseEnter={() => setActiveFeature(index)}
                            >
                                <div
                                    className="text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-300 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="relative z-10 px-6 py-20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Loved by
                            <span
                                className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"> Fitness Enthusiasts</span>
                        </h2>
                        <p className="text-xl text-gray-300">See what our community says about their transformation
                            journey</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
                            >
                                <div className="flex items-center space-x-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400"/>
                                    ))}
                                </div>

                                <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>

                                <div className="flex items-center space-x-3">
                                    <div
                                        className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-semibold">{testimonial.name}</div>
                                        <div className="text-sm text-gray-400">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">
                        Ready to Transform Your
                        <span
                            className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"> Fitness Journey?</span>
                    </h2>

                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Join millions of users who've already transformed their health with FitTrack Pro.
                        Start your experience today - no credit card required.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to={"/register"}>
                            <button
                                className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                                <span>Get started</span>
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform"/>
                            </button>
                        </Link>
                    </div>

                    <div className="flex items-center justify-center space-x-8 mt-8 text-sm text-gray-400">
                        <span>✓ 14-day free trial</span>
                        <span>✓ Cancel anytime</span>
                        <span>✓ No credit card required</span>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 px-6 py-12 border-t border-white/10 bg-black/20 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div
                                    className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                                    <Zap className="w-5 h-5 text-white"/>
                                </div>
                                <span className="text-xl font-bold">FitTrack Pro</span>
                            </div>
                            <p className="text-gray-400">
                                Transform your fitness journey with AI-powered insights and personalized coaching.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 FitTrack Pro. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;