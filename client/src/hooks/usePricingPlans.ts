import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPricingPlans = async () => {
    const response = await axios.get("/api/pricingplans");
    return response.data;
};
export const useFetchPricingPlans = () => {
    return useQuery({
        queryKey: ["pricingplans"],
        queryFn: fetchPricingPlans,
    });
};
