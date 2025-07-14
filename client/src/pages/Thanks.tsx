export default function Thanks() {
    return (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-500 transform hover:scale-[1.01]">
                <div className="relative h-48 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                    {/* Animated checkmark */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <img src="celebrate.png" width={200} height={200}/>
                    </div>
                    {/* Confetti container */}
                    <div
                        id="confetti-container"
                        className="absolute inset-0 overflow-hidden"
                    />
                </div>
                <div className="p-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Thank You for Voting!
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Your vote has been successfully recorded. Every voice
                        matters in shaping our future.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <div className="bg-indigo-50 p-4 rounded-lg w-40">
                            <i className="fas fa-users text-indigo-600 text-3xl mb-2" />
                            <p className="font-medium text-indigo-700">
                                Community
                            </p>
                            <p className="text-sm text-gray-600">
                                Your voice strengthens our community
                            </p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg w-40">
                            <i className="fas fa-chart-line text-purple-600 text-3xl mb-2" />
                            <p className="font-medium text-purple-700">
                                Impact
                            </p>
                            <p className="text-sm text-gray-600">
                                See the difference you make
                            </p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg w-40">
                            <i className="fas fa-bell text-blue-600 text-3xl mb-2" />
                            <p className="font-medium text-blue-700">Updates</p>
                            <p className="text-sm text-gray-600">
                                We'll keep you informed
                            </p>
                        </div>
                    </div>
                    <div className="mb-6">
                        <p className="text-gray-500 mb-3">
                            Share your participation:
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button className="w-10 h-10 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                                <i className="fab fa-facebook-f" />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors">
                                <i className="fab fa-twitter" />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors">
                                <i className="fab fa-instagram" />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-gray-700 text-white hover:bg-gray-800 transition-colors">
                                <i className="fas fa-envelope" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
