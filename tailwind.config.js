/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // User requested purple palette
        retropurple: {
          100: '#C3BCEC',
          300: '#4D5392',
          500: '#31305F',
          700: '#1C1A4B',
          900: '#1B194E',
        },
        // User requested green palette
        retrogreen: {
          magenta: '#C92293',
          neon: '#00FF00',
          dark: '#0EA645',
          bright: '#0CD554',
          medium: '#159A4A',
        },
        // User requested pink palette
        retropink: {
          neon: '#FF00AA',
          rose: '#FA457E',
          soft: '#FECEE4',
          orchid: '#E874C4',
          pastel: '#F99CDD',
        },
        // User requested yellow palette
        retroyellow: {
          bright: '#FFFF63',
          cream: '#FFF1BC',
          warm: '#FFE88B',
          pure: '#FFFF00',
        },
        // User requested blue palette
        retroblue: {
          teal: '#2994A7',
          steel: '#22426C',
          midnight: '#1D1F53',
          cyan: '#00FFFF',
        },
      },
      fontFamily: {
        vt323: ['"VT323"', 'monospace'],
        pixel: ['"Press Start 2P"', 'monospace'],
        mono: ['"Share Tech Mono"', 'monospace'],
        silkscreen: ['"Silkscreen"', 'monospace'],
      },
    },
  },
  plugins: [],
}

