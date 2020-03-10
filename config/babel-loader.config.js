module.exports = {
  loader: 'babel-loader',
  options: {
    babelrc: false,
    presets: [
      [
        '@babel/preset-env',
        {
          targets: { ie: '11' },
        },
      ],
      '@babel/preset-typescript',
      '@babel/preset-react',
    ],
    plugins: [
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      '@babel/plugin-transform-runtime',
    ],
  },
};
