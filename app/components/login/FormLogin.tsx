"use client";

import { useRouter } from "next/navigation";
import { JSX, useState } from "react";

type UserLogin = {
    email: string;
    password: string;
}

type Response = {
    status: number;
    message: string;
    data?: { role?: string; }
}

const FormLogin = (): JSX.Element => {
    const router = useRouter();
    const [input, setInput] = useState<UserLogin>({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setError(null);
        setInput({ ...input, [event.target.name]: event.target.value });
    };

    const resetForm = () => {
        setInput({ email: "", password: "" });
        setError(null);
    }

    const handleSubmitButton = async () => {
        setLoading(true);
        setError(null);

        if (!(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.email))) {
            setError("Email nya salah anjing!");
            setLoading(false);
            return
        }

        if ((input.password.length < 8) || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(input.password)) {
            setError("Passwordnya minimal ada 8 karakter, harus ada angka, huruf kecil, dan huruf besar bangsad!");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(input),
                credentials: "include"
            })

            const response: Response = await res.json();

            if (res.status !== 200) {
                throw new Error("Email or Password Incorrect");
            }

            const role = response.data?.role;

            if (role === "admin") {
                router.push("/admin");
            } else {
                router.push("/user");
            }


        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "An unexpected error occurred";
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="card-body">

            <h2 className="card-title justify-center text-2xl mb-4">LOGIN</h2>

            {error && <p className="text-red-500 text-center bg-red-200 py-3 px-2 rounded-lg">{error}</p>}
            <div className="justify-end card-actions">
                <div className="w-full">
                    <label className={`input validator w-full focus:outline-none focus-within:outline-none  ${input.email === "" ? "border-gray-300" : ""}`}>
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </g>
                        </svg>
                        <input
                            type={"email"}
                            name={"email"}
                            placeholder="mail@site.com"
                            value={input.email}
                            onChange={handleSubmit}
                            required
                        />
                    </label>
                    {
                        input.email === "" ? "" : (
                            <div className="validator-hint hidden">Enter valid email address</div>
                        )
                    }
                </div>

                <div className="w-full">
                    <label className={`input validator w-full focus:outline-none focus-within:outline-none  ${input.password === "" ? "border-gray-300" : ""}`}>
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path
                                    d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                                ></path>
                                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                            </g>
                        </svg>
                        <input
                            type={"password"}
                            name={"password"}
                            value={input.password}
                            onChange={handleSubmit}
                            placeholder="Password"
                            minLength={8}
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$"
                            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                            required
                        />
                    </label>
                    {
                        input.password === "" ? "" : (
                            <p className="validator-hint hidden">
                                Must be more than 8 characters, including
                                <br />At least one number
                                <br />At least one lowercase letter
                                <br />At least one uppercase letter
                            </p>
                        )
                    }

                </div>

                <div className="w-full">
                    <button
                        className="btn btn-primary w-full disabled:text-gray-500 mb-1"
                        type="button"
                        onClick={handleSubmitButton}
                        disabled={loading}
                    >
                        Login
                    </button>

                    <button
                        onClick={resetForm}
                        className="btn bg-red-500 text-white w-full disabled:text-gray-500"
                        disabled={loading}
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FormLogin