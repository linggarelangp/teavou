/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

const config = {
    content: [
        "./app/**/*.{jsx,tsx}",
        "./pages/**/*.{jsx,tsx}",
        "./components/**/*.{jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [daisyui],
};

export default config;