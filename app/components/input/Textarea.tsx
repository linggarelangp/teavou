import React from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
    error?: string;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ label, error, ...props }, ref) => (
    <div className="mb-4">
        <label className="block text-sm font-medium">{label}</label>
        <textarea
            cols={4}
            rows={4}
            ref={ref}
            {...props}
            className={`mt-1 py-1.5 pl-2 block w-full rounded-md border border-gray-200 shadow-sm focus:outline-none focus-within:outline-none sm:text-sm ${error ? "border-red-500" : ""}`}
        />
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
));

Textarea.displayName = "Textarea";

export default Textarea;
