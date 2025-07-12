import { Avatar, Menu } from "@material-tailwind/react";
import {
    Dollar,
    HeadsetHelp,
    LogIn,
    LogOut,
    UserCircle,
} from "iconoir-react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/useHooks";
import type { RootState } from "../stores";
import { useState } from "react";
export default function ProfileMenu() {
    const { user } = useAppSelector((state: RootState) => state.auth);
    const [avatarError, setAvatarError] = useState(false);

    const fallbackAvatar =
        "https://ui-avatars.com/api/?name=User&background=random";
    return (
        <Menu>
            <Menu.Trigger
                as={Avatar}
                size="sm"
                alt="profile-picture"
                src={!avatarError ? user?.profile.picture : fallbackAvatar}
                onError={() => setAvatarError(true)}
            />
            <Menu.Content>
                {user && (
                    <>
                        <Menu.Item>
                            <UserCircle className="mr-2 h-[18px] w-[18px]" /> My
                            Profile
                        </Menu.Item>
                        <Link to="pricingplans">
                            <Menu.Item>
                                <Dollar className="mr-2 h-[18px] w-[18px]" /> Add
                                Credits
                            </Menu.Item>
                        </Link>
                    </>
                )}
                <Menu.Item>
                    <HeadsetHelp className="mr-2 h-[18px] w-[18px]" /> Support
                </Menu.Item>
                <hr className="!my-1 -mx-1 border-surface" />
                {user ? (
                    <a href="/api/logout">
                        <Menu.Item className="text-error hover:bg-error/10 hover:text-error focus:bg-error/10 focus:text-error dark:hover:text-error dark:focus:text-error">
                            <LogOut className="mr-2 h-[18px] w-[18px]" />
                            Logout
                        </Menu.Item>
                    </a>
                ) : (
                    <Link to="/auth">
                        <Menu.Item>
                            <LogIn className="mr-2 h-[18px] w-[18px]" />
                            Login
                        </Menu.Item>
                    </Link>
                )}
            </Menu.Content>
        </Menu>
    );
}
