import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useHooks";
import type { RootState } from "../stores";
import {
    surveyActions,
} from "../stores/slices/surveySlice";
import _ from "lodash";
import SurveyCard from "./SurveyCard";
import { Spinner } from "@material-tailwind/react";
import Pagination from "./Pagination";
import SortDropdown from "./Sort/SortDropdown";
import OrderDropdown from "./Order/OrderDropdown";
import { useFetchSurveys } from "../hooks/useSurvey";

const RecentCampaigns: React.FC = () => {
    const { pages, page, sort } = useAppSelector(
        (state: RootState) => state.survey
    );
    const { isLoading, data } = useFetchSurveys({
        page: page,
        limit: 3,
        sort: sort,
    });
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (data) {
            dispatch(
                surveyActions.setPages({
                    pages: data.pages,
                    total: data.total,
                    page: data.page,
                })
            );
        }
    }, [dispatch, data]);
    const handlePageChange = (page: number) => {
        dispatch(surveyActions.setCurrentPage(page));
    };
    return (
        <div className="lg:col-span-2">
            <div className="p-5 bg-white rounded-lg shadow">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium text-gray-900">
                        Recent Campaigns
                    </h2>
                    {/* <a
                        href="#"
                        className="text-sm font-medium text-primary hover:text-primary-dark"
                    >
                        View all
                    </a> */}
                    <div className="flex gap-3">
                        <SortDropdown />
                        <OrderDropdown />
                    </div>
                </div>
                {isLoading ? (
                    <div className="w-full flex justify-center items-center">
                        <Spinner className="w-10 h-10" />
                    </div>
                ) : data.surveys && data.surveys.length === 0 ? (
                    <div className="text-center text-gray-500">
                        No recent campaigns found.
                    </div>
                ) : (
                    <>
                        <div className="space-y-4">
                            {_.map(data.surveys, (item) => (
                                <SurveyCard key={item._id} survey={item} />
                            ))}

                            <Pagination
                                page={page}
                                pages={pages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
export default RecentCampaigns;
