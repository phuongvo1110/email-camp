import type { Survey } from "../models/survey";
import _ from "lodash";
import ReactTimeAgo from "react-time-ago";
interface SurveyCardProps {
    survey: Survey;
}
const SurveyCard: React.FC<SurveyCardProps> = ({ survey }) => {
    return (
        <div className="flex items-start p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
            <div
                className={`flex-shrink-0 p-2 mt-1 mr-3 rounded-full
                    ${
                        survey.status === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : survey.status === "success"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                    }
                `}
            >
                <i
                    className={`fas
                        ${
                            survey.status === "pending"
                                ? "fa-clock"
                                : survey.status === "success"
                                ? "fa-check-circle"
                                : "fa-times-circle"
                        }
                    `}
                />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                    {survey.title}
                </p>
                <p className="text-sm text-gray-500">
                    {survey.status === "pending"
                        ? "Sending"
                        : survey.status === "success"
                        ? "Sent"
                        : "Failed sending"}{" "}
                    to {survey.recipients.length} contacts
                </p>
                <div className="mt-1">
                    <div className="flex items-center text-xs text-gray-500">
                        <span>
                            {(
                                _.filter(
                                    survey.recipients,
                                    (rep) => rep.responded === true
                                ).length / (survey.recipients.length || 1)
                            ).toLocaleString(undefined, {
                                style: "percent",
                                minimumFractionDigits: 0,
                            })}{" "}
                            response rate
                        </span>
                        <span className="mx-1">•</span>
                        <span>{survey.yes} chose Yes</span>
                        <span className="mx-1">•</span>
                        <span>{survey.no} chose No</span>
                        <span className="mx-1">•</span>
                        <span>
                            <ReactTimeAgo date={new Date(survey.dateSent)} />
                        </span>
                    </div>
                </div>
            </div>
            <div className="ml-4">
                <button className="p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none">
                    <i className="fas fa-ellipsis-v" />
                </button>
            </div>
        </div>
    );
};
export default SurveyCard;
