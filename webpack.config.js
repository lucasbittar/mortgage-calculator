var debug = process.env.NODE_ENV !== 'production'
var path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin')
// var UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: debug ? 'development' : process.env.NODE_ENV,
  entry: './src/js/index.js',
  output: {
    path: debug
      ? path.resolve(__dirname, 'public')
      : path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread']
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: debug
    ? []
    : [
        new CopyWebpackPlugin([
          {
            from: path.resolve(__dirname, 'public/index.html'),
            to: path.resolve(__dirname, 'build')
          },
          {
            from: path.resolve(__dirname, 'public/favicon.ico'),
            to: path.resolve(__dirname, 'build')
          }
        ])
      ]
}
