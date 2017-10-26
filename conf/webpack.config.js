const CWD = process.cwd();

module.exports = {
  context: CWD + '/src',
  entry: CWD + '/src/index.jsx',
  output: {
    path: CWD + '/dist',
    filename: 'app.js',
  },
  devtool: 'inline-source-map',
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
