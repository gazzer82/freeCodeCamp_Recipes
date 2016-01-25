var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

//Auto prefixing for our CSS

var autoprefixer = require('autoprefixer');
var precss       = require('precss');

console.log(__dirname);
module.exports = {
  entry: [
    './src/index'
  ],
  devtool: 'source-map',
  output:{
    path: __dirname + '/dist/js',
    publicPath: '/js',
    filename: "app.js"
  },
  resolve: {
        extensions: [
            '', '.js', '.jsx',
            '.css', '.styl', '.scss', '.less', '.sass'
          ],
          alias: {
          }
  },
  module: {
    loaders:[
      //JSX
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        loaders: ['babel']
      },
      //JS
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loaders: ['babel']
      },
      //SCSS
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        loader: 'style!css!postcss-loader!sass'
      },
      {
        test: /\.(woff|woff2)$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.ttf$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.eot$/,
        loader: "file"
      },
      //Images
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "url?limit=25000"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'underscore-template-loader!./html/index_template.html',
      title: 'Recipes',
      inject: 'body',
      filename: '../index.html'
    }),
    new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
    })
  ],
  //config for postcss, prefix css files
  postcss: function () {
    return [autoprefixer];
  }
}
