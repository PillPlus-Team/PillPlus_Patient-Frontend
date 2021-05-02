module.exports = {
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
          18: '4.5rem',
          88: '22rem',
          92: '23rem',
          112: '28rem',
          120: '30rem',
          124: '31rem',
          128: '32rem',
          136: '34rem',
          140: '35rem',
          144: '36rem',
          148: '37rem',
          152: '38rem',
          160: '40rem',
          176: '44rem',
      },
      width: {
        '99/100': '99.0%',
        '995/1000': '99.50%',
      },
    },
    flexGrow: {
      '0': 0,
      DEFAULT: 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
      '8': 8,
      '9': 9,
      '10': 10,
    },
    flex: {
      '1': '1 1 0%',
      'left': '6 0 0%',
      'left2': '4 0 0%',
      'right': '10 0 0%'
    }

  },
  variants: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['group-focus'],
      textColor: ['group-focus'],
    }
    
  },
  plugins: [
    require('@tailwindcss/line-clamp')

  ],
}