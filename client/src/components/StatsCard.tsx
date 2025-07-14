import React from 'react';

export interface StatsCardProps {
    /** The main title/label for the stat */
    title: string;
    /** The primary value to display */
    value: string | number;
    /** Icon class (FontAwesome) for the card */
    icon: string;
    /** Background color for the icon container */
    iconBgColor: string;
    /** Text color for the icon */
    iconTextColor: string;
    /** Change percentage (e.g., "+12.5%") */
    changeValue?: string;
    /** Color class for the change value */
    changeColor?: string;
    /** Description text that appears after the change value */
    changeDescription?: string;
    /** Additional CSS classes for the card */
    className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
    title,
    value,
    icon,
    iconBgColor,
    iconTextColor,
    changeValue,
    changeColor = 'text-green-600',
    changeDescription,
    className = '',
}) => {
    return (
        <div className={`p-5 bg-white rounded-lg shadow ${className}`}>
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-sm font-medium text-gray-500 truncate">
                        {title}
                    </div>
                    <div className="mt-1 text-3xl font-semibold text-gray-900">
                        {value}
                    </div>
                </div>
                <div className={`p-3 rounded-full ${iconBgColor} ${iconTextColor}`}>
                    <i className={icon} />
                </div>
            </div>
            {(changeValue || changeDescription) && (
                <div className="mt-4">
                    {changeValue && (
                        <span className={`text-sm font-medium ${changeColor}`}>
                            {changeValue}
                        </span>
                    )}
                    {changeDescription && (
                        <span className="ml-2 text-sm text-gray-500">
                            {changeDescription}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default StatsCard;
