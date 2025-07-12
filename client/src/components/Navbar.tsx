import {
    Badge,
    BadgeContent,
    BadgeIndicator,
    IconButton,
} from "@material-tailwind/react";
import ProfileMenu from "./ProfileMenu";
import { Dollar } from "iconoir-react";
import { useAppSelector } from "../hooks/useHooks";
import type { RootState } from "../stores";
import { Link } from "react-router-dom";

export default function Navbar() {
    const { user } = useAppSelector((state: RootState) => state.auth);
    return (
        <div className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200">
            <div className="flex items-center md:hidden">
                <button className="text-gray-500 focus:outline-none">
                    <i className="fas fa-bars" />
                </button>
            </div>
            <div className="flex-1 px-4">
                <div className="relative max-w-md">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <i className="fas fa-search text-gray-400" />
                    </div>
                    <input
                        className="block w-full py-2 pl-10 pr-3 text-sm bg-gray-100 border border-transparent rounded-md focus:bg-white focus:border-gray-300 focus:outline-none"
                        placeholder="Search..."
                    />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <Link to="/pricingplans">
                    <Badge>
                        <BadgeContent>
                            <IconButton className="bg-white text-primary border-primary">
                                <Dollar className="w-4 h-4 stroke-2 text-primary" />
                            </IconButton>
                        </BadgeContent>
                        <BadgeIndicator className="border-background text-white">
                            {user ? user.credits : 0}
                        </BadgeIndicator>
                    </Badge>
                </Link>
                <div className="relative">
                    <ProfileMenu />
                </div>
            </div>
        </div>
    );
}
