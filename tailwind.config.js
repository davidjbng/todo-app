module.exports = {
  purge: [
    './src/**/*.tsx',
    './src/**/*.ts',
    './src/**/*.css'
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  }
}