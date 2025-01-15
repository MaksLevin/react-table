const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@core': path.resolve(__dirname, 'src/core/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@styles': path.resolve(__dirname, 'src/styles/')
    },
  },
};