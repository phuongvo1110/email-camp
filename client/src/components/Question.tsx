const Question: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
    ...props
}) => {
    return (
        <div className="question bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-700 text-sm font-medium">
                    Question
                </label>
                {/* <button className="delete-question text-red-500 hover:text-red-700">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                </button> */}
            </div>
            <input
                {...props}
                type="text"
                className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your question"
            />
            {/* <div className="flex space-x-4">
                <label className="inline-flex items-center">
                    <input
                        type="radio"
                        name="${questionId}-type"
                        defaultValue="yesno"
                        defaultChecked={true}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">Yes/No</span>
                </label>
                <label className="inline-flex items-center">
                    <input
                        type="radio"
                        name="${questionId}-type"
                        defaultValue="text"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">Text Response</span>
                </label>
            </div> */}
        </div>
    );
};
export default Question;