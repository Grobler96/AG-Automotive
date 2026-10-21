/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050505',
        carbon: '#0C0F09',
        panel: '#11160D',
        line: '#26331A',
        lime: '#7ED321',
        volt: '#39FF14',
        butter: '#FFF3A0',
        paper: '#F2F6EC',
      },
      fontFamily: {
        display: ['"Chakra Petch"', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(126,211,33,0.5), 0 0 28px rgba(126,211,33,0.25)',
      },
    },
  },
  plugins: [],
};
