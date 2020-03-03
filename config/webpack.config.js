const { resolve } = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const babelConfig = require('./babel-loader.config');

const rootPath = resolve(__dirname, './../');
const srcPath = `${rootPath}/src`;

const config = {
  development: {
    webpack: {
      entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './index.tsx',
      ],
      devServer: {
        hot: true,
      },
      devtool: 'cheap-module-eval-source-map',
      plugins: [new webpack.HotModuleReplacementPlugin()],
    },
  },
  production: {
    webpack: {
      entry: './index.tsx',
      output: {
        filename: 'js/bundle.[hash].min.js',
        path: `${rootPath}/dist`,
        publicPath: '/',
      },
      devtool: 'source-map',
      stats: {
        entrypoints: false,
        children: false,
      },
    },
  },
};

module.exports = (env, argv) => {
  const mode = argv.mode === 'development' ? 'development' : 'production';
  const envConfig = config[mode];

  return merge(envConfig.webpack, {
    mode,
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        '@components': `${srcPath}/components`,
        '@store': `${srcPath}/store`,
      },
    },
    context: srcPath,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          ...babelConfig,
        },
      ],
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        tsconfig: `${rootPath}/tsconfig.json`,
        async: true,
        memoryLimit: 1024,
        useTypescriptIncrementalApi: true,
      }),
      new HtmlWebpackPlugin({ template: 'index.html.ejs' }),
    ],
  });
};
