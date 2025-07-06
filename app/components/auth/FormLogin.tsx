"use client";

import Link from "next/link";
import { JSX, useState } from "react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaKey } from "react-icons/fa6";

import { IUser } from "@/app/types";
import { AuthInput } from "@/app/components/Input";

type ResponseData = {
    success: boolean;
    data?: Partial<IUser>
}

const FormLogin = (): JSX.Element => {
    const router = useRouter();
    const [input, setInput] = useState<{ email: string, password: string }>({
        email: "",
        password: ""
    });
    const [touched, setTouched] = useState<{ email: boolean, password: boolean }>({
        email: false,
        password: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setError(null);
        setInput({ ...input, [event.target.name]: event.target.value });
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
    };

    const resetForm = () => {
        setInput({ email: "", password: "" });
        setError(null);
    }

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        if (!(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.email))) {
            setError("Invalid email format, e.g,");
            setLoading(false);
            return
        }

        if ((input.password.length < 8) || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(input.password)) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(input),
                credentials: "include"
            });

            const res: ResponseData = await response.json();

            if (!res.success) {
                throw new Error("Email or password incorrect");
            }

            if (res.data?.role === "admin") {
                router.push("/admin");
            } else {
                router.push("/");
            }

        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "An unexpected error occurred";
            setError(message);
        } finally {
            setLoading(false);
        };
    };

    return (
        <div className="card-body">
            <h2 className="card-title justify-center text-2xl mb-7">Login to your account</h2>

            {error && <p className="text-error text-center bg-red-200 py-3 px-2 rounded-lg">{error}</p>}

            <div className="justify-end card-actions">
                <div className="w-full mb-1">
                    <AuthInput
                        label={"email"}
                        type={"email"}
                        name={"email"}
                        value={input.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        icon={<FaEnvelope className="text-gray-500" />}
                        error={touched.email && input.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.email)
                            ? "Enter valid email address"
                            : ""
                        }
                        placeholder="Email"
                    />
                </div>

                <div className="w-full mb-7">
                    <label htmlFor="password" className="text-gray-500 pl-1">Password</label>
                    <label className={`my-1 input input-md rounded-xl validator w-full focus:outline-none focus-within:outline-none  ${input.password === "" ? "border-gray-300" : ""}`}>
                        <FaKey className="text-gray-500" />
                        <input
                            id="password"
                            type={"password"}
                            name={"password"}
                            value={input.password}
                            onChange={handleChange}
                            placeholder="Password"
                            minLength={8}
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$"
                            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                            required
                        />
                    </label>
                    {
                        input.password === ""
                            ? "" : (
                                <p className="validator-hint hidden">
                                    Must be more than 8 characters, including
                                    <br />At least one number
                                    <br />At least one lowercase letter
                                    <br />At least one uppercase letter
                                </p>
                            )
                    }
                </div>

                <div className="w-full mb-2">
                    <button
                        className="btn bg-sky-600 hover:bg-sky-700 text-white w-full rounded-xl disabled:text-gray-500 mb-3 py-5"
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        Login Now
                    </button>

                    <button
                        onClick={resetForm}
                        className="btn bg-transparent hover:bg-red-600 text-red-600 hover:text-white w-full rounded-xl disabled:text-gray-500 transition-colors duration-150 border-[0.5px] border-red-600"
                        disabled={loading}
                    >
                        Reset
                    </button>
                </div>

                <p className="text-gray-400 text-center">Don&apos;t have an account?
                    <Link
                        href={"/register"}
                        className="text-blue-400 hover:text-blue-600 transition duration-300 font-semibold ml-1"
                    >
                        Register
                    </Link>

                </p>
            </div>
        </div>
    );
};

export default FormLogin;