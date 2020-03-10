const { resolve } = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

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
        historyApiFallback: true,
      },
      devtool: 'cheap-module-eval-source-map',
      plugins: [new webpack.HotModuleReplacementPlugin()],
    },
  },
  production: {
    webpack: {
      entry: './index.tsx',
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

  const envPath = `${rootPath}/.env.${mode}`;
  const envFileParams = dotenv.config({ path: envPath }).parsed;

  const envKeys = Object.keys(envFileParams).reduce((prev, next) => {
    const prevModified = { ...prev };

    prevModified[`process.env.${next}`] = JSON.stringify(envFileParams[next]);

    return prevModified;
  }, {});

  return merge(envConfig.webpack, {
    mode,
    output: {
      path: `${rootPath}/dist`,
      publicPath: '/',
      filename: 'js/bundle.[hash].min.js',
      chunkFilename: 'js/page.[name].min.js',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        '@components': `${srcPath}/components`,
        '@store': `${srcPath}/store`,
        '@utils': `${srcPath}/utils`,
        '@src': `${srcPath}`,
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
      new webpack.DefinePlugin(envKeys),
    ],
  });
};
