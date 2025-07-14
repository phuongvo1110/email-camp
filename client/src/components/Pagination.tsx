import PaginButton from "./PaginButton";

interface PaginationProps {
    page: number;
    pages: number;
    onPageChange: (page: number) => void;
}
const Pagination: React.FC<PaginationProps> = ({
    page,
    pages,
    onPageChange,
}) => {
    const pageArray = Array.from({ length: pages }, (_, i) => i + 1);
    return (
        <div className="flex items-center justify-center w-full">
            <div className="flex items-center gap-1">
                <PaginButton
                    next={false}
                    page={page}
                    pages={pages}
                    onPageChange={onPageChange}
                >
                    <svg
                        width="1.5em"
                        height="1.5em"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        color="currentColor"
                        className="mr-1.5 h-4 w-4 stroke-2"
                    >
                        <path
                            d="M15 6L9 12L15 18"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>{" "}
                    Previous
                </PaginButton>
                {pageArray.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        className={`inline-grid min-h-[36px] min-w-[36px] select-none place-items-center border text-center align-middle text-sm font-medium leading-none transition-all duration-300 ease-in disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${
                            pageNumber === page
                                ? "border-slate-800 bg-slate-800 text-slate-50 hover:border-slate-700 hover:bg-slate-700 rounded-md"
                                : "border-transparent bg-transparent text-slate-800 hover:border-slate-800/5 hover:bg-slate-800/5 rounded-full"
                        }`}
                        disabled={pageNumber === page}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}

                <PaginButton
                    next={true}
                    page={page}
                    pages={pages}
                    onPageChange={onPageChange}
                >
                    Next{" "}
                    <svg
                        width="1.5em"
                        height="1.5em"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        color="currentColor"
                        className="ml-1.5 h-4 w-4 stroke-2"
                    >
                        <path
                            d="M9 6L15 12L9 18"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </PaginButton>
            </div>
        </div>
    );
};
export default Pagination;
