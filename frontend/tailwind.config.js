/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx,cjs,mjs,ts,cts,mts}",  // Make sure your project files are included
    ],
    theme: {
      extend: {},
    },
    plugins: [require("daisyui")],  // Add DaisyUI as a plugin
  };
  