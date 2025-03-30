import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		  boxShadow: {
			// ... your existing box shadows ...CARDS
			glow: "0 0 20px rgba(255, 77, 143, 0.5)", // Or the purple one: "0 0 20px rgba(139, 92, 246, 0.3)" - choose one or rename
		 },
  		keyframes: {
			"accordion-down": {
				from: { height: "0" },
				to: { height: "var(--radix-accordion-content-height)" },
			  },
			  "accordion-up": {
				from: { height: "var(--radix-accordion-content-height)" },
				to: { height: "0" },
			  },
			  "gradient-x": { // <-- Newsletter
				"0%, 100%": { backgroundPosition: "0% 50%" },
				"50%": { backgroundPosition: "100% 50%" },
			  },
			  float: { // <-- Newsletter
				"0%": { transform: "translateY(0) translateX(0)" },
				"33%": { transform: "translateY(-10px) translateX(10px)" },
				"66%": { transform: "translateY(10px) translateX(-10px)" },
				"100%": { transform: "translateY(0) translateX(0)" },
			  },
			  "fade-in": { // <-- Newsletter
				"0%": { opacity: "0", transform: "translateY(10px)" },
				"100%": { opacity: "1", transform: "translateY(0)" },
			  },
			   // --> Add Keyframes from the separate @keyframes rules provided <--
    fadeIn: { // Renamed from separate rule CARDS
		from: { opacity: "0", transform: "translateY(10px)" },
		to: { opacity: "1", transform: "translateY(0)" },
	  },
	  scaleIn: { // Renamed from separate rule CARDS
		from: { transform: "scale(0.95)" },
		to: { transform: "scale(1)" },
	  }
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
			  "gradient-x": "gradient-x 15s ease infinite", // <-- Newsletter
			  float: "float 6s ease-in-out infinite", // <-- Newsletter
			  "fade-in": "fade-in 0.5s ease-out forwards", // <-- Newsletter
			   // --> Add Animations from the separate rules provided <--
			   fadeIn: "fadeIn 0.5s ease forwards", // Corresponds to fadeIn keyframe CARDS
			   scaleIn: "scaleIn 0.3s ease forwards", // Corresponds to scaleIn keyframe CARDS
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
