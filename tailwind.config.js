module.exports = {
  content: ["./src/.js", "./src/**/*.js", "./public/*.html"],
  theme: {
    extend: {
      backgroundColor: {
        "bg-primary": "#202020",
        "bg-dark": "#171717",
        "bg-darker": "#262424",
        "bg-soft-gray": "#3a3a3a",
      },
      colors: {
        "g-blue": "#0047FF",
        "g-pale-green": "#39DBAA",
        "g-light-green": "#00FF29",
        "text-gray": "#a6a6a6",
      },
      fontFamily: {
        "open-sans": ["Open Sans", "Roboto", "sans-serif"],
        "roboto": ["Roboto", "sans-serif"],
        "lato": ["lato", "Roboto", "sans-serif"],
      },
      backgroundImage: {
        "logo-watermark" : "url('/src/asset/welcome-watermark.svg')"
      },
    },
  },
  plugins: [],
};
