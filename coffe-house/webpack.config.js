const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    script: './src/script.js',
    styles: './src/styles/styles.scss',
    menu: './src/menu.html',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // add path to domain on deploy
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'resolve-url-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[ext]',
        }
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      hot: true,
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['script', 'styles'],
    }),
    new HtmlWebpackPlugin({
      hot: true,
      template: './src/menu.html',
      filename: 'menu.html',
      chunks: ['script', 'styles'],
    }),
  ],
  devServer: {
    hot: true,
    static: path.join(__dirname, 'dist'),
    port: 8080,
    open: true,
  },
};
