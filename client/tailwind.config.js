import { mtConfig } from "@material-tailwind/react";

/** @type {import('tailwindcss').Config} */

export default {
    content: [
        "./index.html",

        "./src/**/*.{js,ts,jsx,tsx}",

        "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}",
    ],

    theme: {
        extend: {
            colors: {
                primary: "#4F46E5",
                secondary: "#10B981",
                dark: "#1F2937",
                light: "#F9FAFB",
            },
        },
    },

    plugins: [mtConfig],
};
