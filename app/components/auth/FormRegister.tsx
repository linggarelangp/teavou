"use client";

import Link from "next/link";
import Swal from "sweetalert2";
import { JSX, useState } from "react";
import { useRouter } from "next/navigation";
import { IoPersonOutline } from "react-icons/io5";
import { FaEnvelope, FaKey } from "react-icons/fa6";

import AuthInput from "@/app/components/Input/AuthInput";


const FormRegister = (): JSX.Element => {
    const router = useRouter();

    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [touched, setTouched] = useState({
        name: false,
        email: false,
        password: false,
        confirmPassword: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setError(null);
        setInput({ ...input, [event.target.name]: event.target.value });
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const { name } = event.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
    };

    const resetForm = () => {
        setInput({
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        });

        setTouched({
            name: false,
            email: false,
            password: false,
            confirmPassword: false
        });
        setError(null);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        if (
            !input.name ||
            (input.confirmPassword.length < 8) ||
            input.password !== input.confirmPassword
        ) {
            setLoading(false);
            return;
        };

        if (
            !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.email) ||
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(input.password)
        ) {
            setError("Invalid email format, e.g,");
            setLoading(false);
            return;
        };

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(input),
            });

            const res: { success: boolean } = await response.json();

            if (!res.success) {
                throw new Error("Registration failed");
            };

            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Register Successfully",
                confirmButtonText: "OK",
            }).then(() => {
                router.push("/login");
            });

            setInput({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            });

            setTouched({
                name: false,
                email: false,
                password: false,
                confirmPassword: false
            });

            return;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "An unexpected error occurred";
            setError(message);
        } finally {
            setLoading(false);
        };
    };

    return (
        <div className="card-body">
            <h2 className="card-title justify-center text-2xl mb-7">Create an account</h2>

            {error && <p className="text-error text-center bg-red-200 py-3 px-2 rounded-lg">{error}</p>}

            <div className="justify-end card-actions">
                <div className="w-full mb-0.5">
                    <AuthInput
                        label={"Name"}
                        type={"name"}
                        name={"name"}
                        value={input.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        icon={<IoPersonOutline className="text-gray-500" />}
                        error={touched.name && !input.name ? "Name is required" : ""}
                        placeholder="Name"
                    />
                </div>

                <div className="w-full mb-0.5">
                    <AuthInput
                        label={"Email"}
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

                <div className="w-full flex space-x-3 mb-7">
                    <div className="w-full mb-0.5">
                        <label htmlFor="password" className="text-gray-500 pl-1">Password</label>

                        <label className={`my-1 input input-md rounded-xl validator w-full focus:outline-none focus-within:outline-none ${touched.password && !input.password
                            ? "border-error"
                            : touched.password &&
                                !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(input.password)
                                ? "border-error"
                                : "border-gray-300"
                            }`}>
                            <FaKey className="text-gray-500" />
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={input.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Password"
                                required
                            />
                        </label>

                        {touched.password && !input.password && (
                            <p className="text-sm text-error">Password is required</p>
                        )}

                        {input.password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(input.password) && (
                            <p className="text-sm text-error mt-1">
                                Password should contain:
                                <br />• At least 8 characters
                                <br />• One number
                                <br />• One lowercase letter
                                <br />• One uppercase letter
                                <br />• One special character
                            </p>
                        )}
                    </div>

                    <div className="w-full mb-0.5">
                        <AuthInput
                            label={"Confirm Password"}
                            type={"password"}
                            name={"confirmPassword"}
                            value={input.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            minLength={8}
                            icon={<FaKey className="text-gray-500" />}
                            error={
                                touched.confirmPassword && !input.confirmPassword
                                    ? "Confirm Password is required"
                                    : touched.confirmPassword &&
                                        input.confirmPassword !== input.password
                                        ? "Confirm Password must match Password"
                                        : ""
                            }
                            placeholder="Confirm Password"
                            required
                        />
                    </div>
                </div>


                <div className="w-full mb-2">
                    <button
                        className="btn bg-sky-600 hover:bg-sky-700 text-white w-full rounded-xl disabled:text-gray-500 mb-3 py-5"
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        Create Account
                    </button>

                    <button
                        onClick={resetForm}
                        className="btn bg-transparent hover:bg-red-600 text-red-600 hover:text-white w-full rounded-xl disabled:text-gray-500 transition-colors duration-150 border-[0.5px] border-red-600"
                        disabled={loading}
                    >
                        Reset
                    </button>
                </div>
                <p className="text-gray-400 text-center">Already have an account?
                    <Link
                        href={"/login"}
                        className="text-blue-400 hover:text-blue-600 transition duration-300 font-semibold ml-1"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default FormRegister;