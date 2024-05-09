/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'secondary':"#E0E7FF",
				'tertiary': "#FFAC0C",
				'primary': "#009BDB",
				'textPrimary':"#F2F2F2",
				'textSecondary':"#4338CA",
				'textTertiary':"#111827",
				'disabledButton':"#C9C9C9", 
				'textParagraph':"#525560",
				'backgroundGrey':"#A7BED3",
				'warningText':"#7F1D1D",
				'warning':"#EF4444",
				'warningBorder':"#FCA5A5"
			  },
			boxShadow: {
				'3xl': '0px 4px 4px 0px rgba(0, 0, 0, 0.25);',
				'4xl': '0px 10px 40px 0px rgba(0, 0, 0, 0.40);'
			},		
		},
	},
	plugins: [],
}
