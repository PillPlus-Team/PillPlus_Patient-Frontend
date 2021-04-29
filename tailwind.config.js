module.exports = {
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['group-focus'],
      textColor: ['group-focus']
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp')

  ],
}