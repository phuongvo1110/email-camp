import { ArrowDown } from "iconoir-react";
import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useHooks";
import { surveyActions } from "../../stores/slices/surveySlice";
import type { RootState } from "../../stores";

const SortDropdown = () => {
    const [open, setOpen] = useState(false);
    const { sort, orderBy } = useAppSelector((state: RootState) => state.survey);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const handleSortChange = (sort: string) => {
        dispatch(surveyActions.setSort(sort));
    };
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    const sortOptions = [
        { label: "Date sent", value: "dateSent" },
        { label: "Title", value: "subject" },
        { label: "Optimistic response", value: "yes" },
    ];

    return (
        <div
            className="dropdown"
            data-placement="bottom-start"
            ref={dropdownRef}
        >
            <button
                type="button"
                data-toggle="dropdown"
                aria-expanded={open}
                onClick={() => setOpen((prev) => !prev)}
                className="inline-flex select-none items-center justify-center rounded-md border-2 border-slate-100 bg-gray-100 px-3.5 py-2.5 text-center align-middle font-sans text-sm font-medium leading-none text-slate-800 transition-all duration-300 ease-in  hover:bg-slate-300 hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
            >
                Sort <ArrowDown className="ml-3 w-3 h-3" />
            </button>
            <div
                data-role="menu"
                className={`${
                    open ? "absolute" : "hidden"
                } mt-2 bg-white border border-slate-200 rounded-lg shadow-xl shadow-slate-950/[0.025] p-1 z-10`}
            >
                {sortOptions.map((option) => (
                    <div
                        key={option.value}
                        className="px-2 py-2 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-md flex items-center"
                    >
                        <div className="inline-flex items-center">
                            <label
                                className="flex items-center cursor-pointer relative"
                                htmlFor={`check-${option.value}`}
                            >
                                <input
                                    type="checkbox"
                                    defaultChecked={option.value === "dateSent"}
                                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow-sm  border border-slate-200 checked:bg-slate-800 checked:border-slate-800"
                                    id={`check-${option.value}`}
                                    checked={orderBy === 'asc' ? sort === option.value : sort === `-${option.value}`}
                                    onChange={() =>
                                        handleSortChange(option.value)
                                    }
                                />
                                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <svg
                                        fill="none"
                                        width="18px"
                                        height="18px"
                                        strokeWidth={2}
                                        color="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M5 13L9 17L19 7"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                            </label>
                            <label
                                className="cursor-pointer ml-2 text-slate-800 text-sm"
                                htmlFor={`check-${option.value}`}
                            >
                                {option.label}
                            </label>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default SortDropdown;
