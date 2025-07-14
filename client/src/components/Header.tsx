interface HeaderProps {
    title?: string;
    description?: string;
    handleClick?: () => void;
}
const Header: React.FC<HeaderProps> = ({ title, description, handleClick }) => {
    return (
        <div className="flex flex-col justify-between mb-6 space-y-4 md:flex-row md:space-y-0">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                <p className="text-gray-600">{description}</p>
            </div>
            <button
                onClick={handleClick}
                id="newCampaignBtn"
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
                <i className="fas fa-plus mr-2" /> New Campaign
            </button>
        </div>
    );
};
export default Header;