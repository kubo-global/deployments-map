module.exports = {
  content: [
    './dist/**/*.html',
    './src/**/*.ts',
    // Add paths to all of the templates in your project
  ],
  theme: {
    extend: {
      colors: {
        afrodidactDark: '#0c0822', 
        afrodidactYellow: '#ffcd31', 
        afrodidactGreen: '#4bba7b', 
        afrodidactRed: '#f14346', 
        afrodidactBlue: '#4a76b9', 
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
