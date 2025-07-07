import React, { JSX, InputHTMLAttributes } from "react";

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    icon?: JSX.Element;
    error?: string;
};

const AuthInput = ({
    label,
    icon,
    error,
    name,
    ...props
}: AuthInputProps): JSX.Element => (
    <React.Fragment>
        <label htmlFor={name} className="text-gray-500 pl-1">
            {label}
        </label>

        <label className={`my-1 input input-md rounded-xl flex items-center gap-2 w-full focus-within:outline-none ${error ? "input-error border-red-500" : "border-gray-300"}`}
        >
            {icon}
            <input
                id={name}
                name={name}
                className="grow bg-transparent"
                {...props}
            />
        </label>

        {error && (
            <p className="text-sm text-error">
                {error}
            </p>
        )}
    </React.Fragment>
);

export default AuthInput;
