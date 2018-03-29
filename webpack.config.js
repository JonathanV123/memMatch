const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractPlugin = new ExtractTextPlugin({
  filename: 'main.css'
});
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  entry: './src/js/game.js',
  devtool: "source-map",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets:['env']
        }
      },
      {
        test: /\.scss$/,
        use: extractPlugin.extract({
          use:['css-loader','sass-loader']
        })
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test:/\.(jpg|png|gif|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name:'[name].[ext]', // keep original filename. Don't want random hash
              outputPath: 'images/',
              publicPath: 'images/',
            }
          }
        ]
      },

  ]
  },
  plugins:[
    extractPlugin,
    new HtmlWebpackPlugin({
      template:'index.html'
    }),
    new CleanWebpackPlugin(['dist'])
  ]
};