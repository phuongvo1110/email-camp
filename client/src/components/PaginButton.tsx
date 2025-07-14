interface PaginButtonProps {
    page: number;
    next: boolean;
    pages?: number;
    onPageChange: (page: number) => void;
    children: React.ReactNode;
}
const PaginButton: React.FC<PaginButtonProps> = ({
    page,
    next,
    pages,
    onPageChange,
    children,
}) => {
    return (
        <button
            disabled={page === (next ? pages : 1)}
            onClick={() => onPageChange(next ? page + 1 : page - 1)}
            className="inline-flex select-none items-center justify-center rounded-full border border-transparent bg-transparent px-3.5 py-2.5 text-center align-middle text-sm font-medium leading-none text-slate-800 transition-all duration-300 ease-in hover:border-slate-800/5 hover:bg-slate-800/5 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
            {children}
        </button>
    );
};
export default PaginButton;