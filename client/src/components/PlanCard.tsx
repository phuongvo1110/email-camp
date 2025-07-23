interface PlanProps {
    idx: number;
    plan: {
        name: string;
        credits: number;
        price: number;
        stripePriceId: string;
    };
    onCheckout: (priceId: string) => void;
    isLoading: boolean;
}
const PlanCard: React.FC<PlanProps> = ({
    idx,
    plan,
    onCheckout,
    isLoading = false,
}) => {
    return (
        <div
            className={`bg-white p-6 rounded-xl shadow-md pricing-card transition duration-300 ${
                idx === 1 ? "shadow-xl highlight-card" : ""
            }`}
        >
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {plan.name}
                </h3>
                <p className="text-gray-600">{plan.credits} email credits</p>
            </div>
            <div className="text-center mb-8">
                <span className="text-2xl font-bold text-gray-900">
                    ${plan.price}
                </span>
                <span className="text-gray-600">/ {plan.credits} credits</span>
                <p className="text-sm text-gray-500 mt-2">
                    ${(plan.price / plan.credits).toFixed(2)} per email
                </p>
            </div>
            <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2" />
                    <span>{plan.credits} email credits</span>
                </li>
            </ul>
            <button
                disabled={isLoading}
                onClick={() => onCheckout(plan.stripePriceId)}
                className={`w-full ${
                    idx === 1 ? "gradient-bg" : "bg-indigo-600"
                } text-white py-3 rounded-md font-medium hover:bg-indigo-700 transition`}
            >
                Choose Plan
            </button>
        </div>
    );
};
export default PlanCard;
