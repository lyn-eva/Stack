module.exports = {
  content: ["./src/.js", "./src/**/*.js", "./public/*.html"],
  theme: {
    extend: {
      backgroundColor: {
        "bg-dark": "#171717",
        "bg-darker": "#262424",
        "bg-soft-gray": "#3a3a3a",
      },
      colors: {
        "g-blue": "#0047FF",
        "g-pale-green": "#39DBAA",
        "g-light-green": "#00FF29",
      },
      fontFamily: {
        "open-sans": ["Open Sans", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
