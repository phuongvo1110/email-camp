interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    className?: string;
    placeholder?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
}
const Textarea: React.FC<TextareaProps> = ({
    label,
    className,
    placeholder,
    error,
    ...props
}) => {
    return (
        <div className="space-y-2">
            <label className="block text-gray-700 text-sm font-medium mb-1">
                {label}
            </label>
            <textarea
                {...props}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${className}`}
                placeholder={placeholder ?? "Enter text here..."}
            />
            {error && (
                <span className="text-red-500 text-sm">{error.message}</span>
            )}
        </div>
    );
};
export default Textarea;
