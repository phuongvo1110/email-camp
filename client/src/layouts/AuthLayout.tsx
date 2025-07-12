export default function AuthLayout() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-auth py-8 px-6 text-center">
                        <h1 className="text-3xl font-bold text-white">
                            Welcome Back
                        </h1>
                        <p className="text-white opacity-90 mt-2">
                            Sign in to continue to your account
                        </p>
                    </div>
                    {/* Form */}
                    <div className="px-8 py-6">
                        {/* Social Login Buttons */}
                        <div className="space-y-4">
                            <a
                                href="/auth/google"
                                className="btn-google w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                            >
                                <i className="fab fa-google text-red-500" />
                                <span>Continue with Google</span>
                            </a>
                            <button className="btn-facebook w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2">
                                <i className="fab fa-facebook-f text-white" />
                                <span>Continue with Facebook</span>
                            </button>
                        </div>
                        {/* Divider */}
                        <div className="divider my-6">OR</div>
                        {/* Email Login Form */}
                        <form className="space-y-4">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="input-field w-full py-2 px-4 rounded-lg focus:outline-none"
                                    placeholder="you@example.com"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Password
                                    </label>
                                    <a
                                        href="#"
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    className="input-field w-full py-2 px-4 rounded-lg focus:outline-none"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="rounded text-blue-600 focus:ring-blue-500"
                                />
                                <label
                                    htmlFor="remember"
                                    className="ml-2 text-sm text-gray-700"
                                >
                                    Remember me
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-auth text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity font-medium"
                            >
                                Sign In
                            </button>
                        </form>
                    </div>
                    {/* Footer */}
                    <div className="bg-gray-50 px-8 py-4 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?
                            <a
                                href="#"
                                className="text-blue-600 font-medium hover:underline"
                            >
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>
                {/* Terms and Privacy */}
                <div className="mt-6 text-center text-xs text-gray-500">
                    By continuing, you agree to our
                    <a href="#" className="underline">
                        Terms of Service
                    </a>{" "}
                    and
                    <a href="#" className="underline">
                        Privacy Policy
                    </a>
                    .
                </div>
            </div>
        </div>
    );
}
