/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'primary':"#E0E7FF",
				'secondary': "#FFAC0C",
				'tertiary': "#009BDB",
				'textPrimary':"#4338CA",
				'textSecondary':"#111827",
				'disabledButton':"#4338CA", 
				'textParagraph':"#525560",
				'backgroundGrey':"#A7BED3",
				'warningText':"#7F1D1D",
				'warning':"#EF4444",
				'warningBorder':"#FCA5A5"
			  },
		},
	},
	plugins: [],
}
