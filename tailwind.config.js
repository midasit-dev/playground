/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
			colors: {
        'pg-black-medium': '#0f172a',
				'pg-blue-light': '#d0eafc',
				'pg-blue-medium': '#62baf3',
				'pg-blue-dark': '#0786c8',
				'pg-gray-light-1': '#e7e7e9',
				'pg-gray-light-2': '#eaedf1',
				'pg-gray-medium': '#eaeced',
				'pg-green-medium': '#85ff00',
      },
		},
  },
  plugins: [],
}
