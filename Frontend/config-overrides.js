const { override, addWebpackPlugin } = require('customize-cra');
const webpack = require('webpack');

module.exports = override(
  // Ignore source-map warnings
  addWebpackPlugin(
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    })
  ),
  (config, env) => {
    // Suppress specific source map warnings
    config.ignoreWarnings = [
      /Failed to parse source map/,
      /ENOENT: no such file or directory/,
      /Module Warning/
    ];

    // Optionally, disable source map generation
    config.devtool = false;

    // Remove source-map-loader for Firebase modules
    config.module.rules = config.module.rules.map(rule => {
      if (rule.use && rule.use.some(u => u.loader === 'source-map-loader')) {
        return {
          ...rule,
          exclude: [/node_modules\/firebase/]
        };
      }
      return rule;
    });

    // Optionally, you can add more specific webpack configurations
    config.module.rules.push({
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      enforce: 'pre',
      use: ['source-map-loader'],
      exclude: [/node_modules\/firebase/]
    });

    return config;
  }
);
