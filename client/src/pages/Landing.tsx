import { Link } from "react-router-dom";

export default function Landing() {
    return (
        <div className="text-primary">
            <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center flex items-center flex-col justify-center">
                    <h1 className="text-4xl font-bold tracking-tight  sm:text-6xl">
                        Collect Feedback That Matters
                    </h1>
                    <p className="mt-6 text-lg leading-8">
                        FeedbackPro helps you understand your customers with
                        powerful survey tools and actionable insights.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/dashboard"
                            className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm animate-bounce bg-primary hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            Get started
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
