import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { Session } from "../models/session";

function formatCurrency(amount: number, currency: string) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
    }).format(amount / 100);
}

export default function Success() {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");

    const [subscription, setSubscription] = useState<Session | null>(null);
    useEffect(() => {
        const fetchSubInfo = async () => {
            if (!sessionId) return;
            const res = await axios.get<Session>(
                `/api/payment/get-subscription-info?session_id=${sessionId}`
            );
            setSubscription(res.data);
        };
        fetchSubInfo();
    }, [sessionId]);

    if (!subscription) return <p>Loading subscription...</p>;

    const { product, price, customer_email, status } = subscription;

    return (
        <>
            <div
                id="confetti-container"
                className="fixed inset-0 overflow-hidden pointer-events-none z-0"
            />
            <header className="bg-white shadow-sm py-4">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <i className="fas fa-envelope-open-text text-indigo-600 text-2xl" />
                        <h1 className="text-xl font-bold text-gray-800">
                            Feedback Collector Pro
                        </h1>
                    </div>
                    <Link
                        to="/dashboard"
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </header>
            <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02]">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 py-6 px-8 text-center">
                        <h2 className="text-2xl font-extrabold text-white">
                            {product.name} Added
                        </h2>
                    </div>
                    <div className="p-8">
                        {/* Animated checkmark */}
                        <svg
                            className="checkmark"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 52 52"
                        >
                            <circle
                                className="checkmark__circle"
                                cx={26}
                                cy={26}
                                r={25}
                                fill="none"
                            />
                            <path
                                className="checkmark__check"
                                fill="none"
                                d="M14.1 27.2l7.1 7.2 16.7-16.8"
                            />
                        </svg>
                        <h3 className="text-center text-2xl font-bold text-gray-800 mb-2">
                            Payment Successful!
                        </h3>
                        <p className="text-center text-gray-600 mb-6">
                            Your subscription (<span className="font-semibold">{product.name}</span>) has been processed and your credits have been added to your account.
                        </p>
                        <div className="bg-indigo-50 rounded-lg p-4 mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600">Plan:</span>
                                <span className="font-semibold text-indigo-700">
                                    {product.name}
                                </span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600">
                                    Price:
                                </span>
                                <span className="font-semibold text-indigo-700">
                                    {formatCurrency(price.unit_amount, price.currency)} / {price.interval}
                                </span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600">
                                    Status:
                                </span>
                                <span className="font-semibold text-indigo-700">
                                    {status.toUpperCase()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600">
                                    Email:
                                </span>
                                <span className="font-semibold text-indigo-700">
                                    {customer_email}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">
                                    Description:
                                </span>
                                <span className="font-semibold text-indigo-700">
                                    {product.description}
                                </span>
                            </div>
                        </div>
                        <div className="text-center mb-6">
                            <p className="text-sm text-gray-500">
                                You can now send emails to your recipients to collect valuable feedback.
                            </p>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <a
                                href="#"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center space-x-2"
                            >
                                <i className="fas fa-paper-plane" />
                                <span>Start a New Campaign</span>
                            </a>
                            <a
                                href="#"
                                className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center space-x-2"
                            >
                                <i className="fas fa-chart-line" />
                                <span>View Dashboard</span>
                            </a>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
                        <p className="text-center text-sm text-gray-500">
                            Need help?{" "}
                            <a
                                href="#"
                                className="text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                                Contact our support
                            </a>
                        </p>
                    </div>
                </div>
            </main>
            <footer className="bg-white py-6 border-t border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 text-sm mb-4 md:mb-0">
                            © 2023 Feedback Collector Pro. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-indigo-600 transition duration-300"
                            >
                                <i className="fab fa-twitter" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-indigo-600 transition duration-300"
                            >
                                <i className="fab fa-linkedin" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-indigo-600 transition duration-300"
                            >
                                <i className="fab fa-github" />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
