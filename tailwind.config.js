/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#6366f1',
                secondary: '#8b5cf6',
                accent: '#f59e0b',
                'bg-primary': '#0a0a0a',
                'bg-secondary': '#1a1a2e',
                'bg-card': 'rgba(255,255,255,0.05)',
                'bg-card-hover': 'rgba(255,255,255,0.08)',
                'text-primary': '#ffffff',
                'text-secondary': '#e5e7eb',
                'text-muted': '#9ca3af',
                'text-accent': '#6366f1',
                'border-color': 'rgba(255,255,255,0.1)',
                'border-accent': 'rgba(99,102,241,0.3)',
            },
            spacing: {
                xs: '0.25rem',
                sm: '0.5rem',
                md: '1rem',
                lg: '1.5rem',
                xl: '2rem',
                '2xl': '3rem',
                '3xl': '4rem',
                '4xl': '5rem',
            },
            borderRadius: {
                sm: '0.375rem',
                md: '0.5rem',
                lg: '0.75rem',
                xl: '1rem',
                '2xl': '1.25rem',
                full: '9999px',
            },
            fontWeight: {
                normal: '400',
                medium: '500',
                semibold: '600',
                bold: '700',
                extrabold: '800',
            },
            boxShadow: {
                sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                glow: '0 10px 25px rgba(99, 102, 241, 0.3)',
            },
            transitionTimingFunction: {
                fast: '0.15s ease',
                normal: '0.3s ease',
                slow: '0.5s ease',
            },
            maxWidth: {
                container: '1200px',
            },
            height: {
                'nav': '80px',
            },
            backgroundImage: {
                'primary-gradient': 'linear-gradient(45deg, #6366f1, #8b5cf6)',
            },
        },
    },
    plugins: [],
    safelist: [
        'bg-primary', 'bg-secondary', 'bg-card', 'bg-card-hover',
        'text-primary', 'text-secondary', 'text-muted', 'text-accent',
        'border-color', 'border-accent',
        'ring-primary', 'ring-accent',
        'hover:bg-primary', 'hover:bg-secondary',
        'hover:text-primary', 'hover:text-secondary',
    ],
}; 