const { globalStyles } = require('../config/globals')

module.exports = {
  core: {
    builder: 'webpack5',
  },
  staticDirs: ['../public'],
  stories: ['../stories/**/*.stories.js', '../src/**/*.stories.js'],
  addons: ['@storybook/preset-scss', '@storybook/addon-essentials', '@storybook/addon-viewport', '@storybook/addon-a11y'],
  // https://storybook.js.org/docs/configurations/custom-webpack-config/
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'sass-loader',
        {
          loader: 'style-resources-loader',
          options: {
            patterns: globalStyles,
          },
        },
      ],
    })

    return config
  },
}
