const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackNotifierPlugin = require('webpack-notifier');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const tls = process.env.TLS;

module.exports = (config, options, targetOptions) => {
  // PLUGINS
  if (config.mode === 'development') {
    config.plugins.push(
      new FriendlyErrorsWebpackPlugin(),
      new WebpackNotifierPlugin({
        title: 'taskmanager',
        contentImage: path.join(__dirname, 'logo-jhipster.png'),
      })
    );
    if (!process.env.JHI_DISABLE_WEBPACK_LOGS) {
      config.plugins.push(
        new SimpleProgressWebpackPlugin({
          format: 'compact',
        })
      );
    }
  }
  if (targetOptions.target === 'serve' || config.watch) {
    config.plugins.push(
      new BrowserSyncPlugin(
        {
          host: 'localhost',
          port: 9000,
          https: tls,
          proxy: {
            target: `http${tls ? 's' : ''}://localhost:${targetOptions.target === 'serve' ? '4200' : '8080'}`,
            proxyOptions: {
              changeOrigin: false, //pass the Host header to the backend unchanged
            },
          },
          socket: {
            clients: {
              heartbeatTimeout: 60000,
            },
          },
          /*
          ghostMode: { // uncomment this part to disable BrowserSync ghostMode;
            clicks: false,
            location: false,
            forms: false,
            scroll: false,
          },
          */
        },
        {
          reload: targetOptions.target === 'build', // enabled for build --watch
        }
      )
    );
  }

  if (config.mode === 'production') {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        // Webpack statistics in target folder
        reportFilename: '../stats.html',
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      })
    );
  }

  const patterns = [
    // jhipster-needle-add-assets-to-webpack - JHipster will add/remove third-party resources in this array
  ];

  if (patterns.length > 0) {
    config.plugins.push(new CopyWebpackPlugin({ patterns }));
  }

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        BUILD_TIMESTAMP: `'${new Date().getTime()}'`,
        VERSION: `'${process.env.hasOwnProperty('APP_VERSION') ? process.env.APP_VERSION : 'DEV'}'`,
        DEBUG_INFO_ENABLED: config.mode === 'development',
        SERVER_API_URL: `''`,
      },
    })
  );

  config = merge(
    config
  );

  return config;
};
