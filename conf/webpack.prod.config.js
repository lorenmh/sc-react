var webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const CWD = process.cwd();

module.exports = {
  context: CWD + '/src',
  entry: CWD + '/src/index.jsx',
  output: {
    path: CWD + '/dist',
    filename: 'dist.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
