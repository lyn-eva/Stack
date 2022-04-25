module.exports = {
  content: ["./src/.js", "./src/**/*.js", "./public/*.html"],
  theme: {
    // screens: {
    //   sm: '430px'
    // },
    extend: {
      backgroundColor: {
        "bg-primary": "#202020",
        "bg-dark": "#171717",
        "bg-darker": "#151515",
        "bg-soft-gray": "#3a3a3a",
      },
      colors: {
        "g-blue": "#0047FF",
        "g-pale-green": "#39DBAA",
        "g-light-green": "#00FF29",
        "text-gray": "#a6a6a6",
        "u-red": "#f00",
        "u-green": "#0f0",
        "u-blue": "#00f",
      },
      fontFamily: {
        "open-sans": ["Open Sans", "Roboto", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        lato: ["lato", "Roboto", "sans-serif"],
        exo: ["exo", "Roboto", "sans-serif"],
      },
      backgroundImage: {
        "logo-watermark": "url('/src/asset/welcome-watermark.svg')",
      },
      boxShadow: {
        l2: "0 2px #00000020",
      },
      fontSize: {
        't-u-sm': '10px',
        't-sm': '12px',
        't-md': '15px',
        't-lg': '16px',
        't-ultra' : '18px',
        't-xl': '20px',
        't-2xl': '22px',
        't-3xl': '28px',
        't-4xl': '48px',
      }
    },
  },
  plugins: [],
};
