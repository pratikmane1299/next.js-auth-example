/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
		"./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
		"./ui/**/*.{ts,tsx}",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
  theme: {
    extend: {},
  },
  plugins: [
		require("flowbite/plugin"),
	],
}
