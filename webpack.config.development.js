const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require('compression-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// const devMode = process.env.NODE_ENV !== 'production'

const devMode = 'Development'

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    style: './src/style.js',
    main: './src/main.js',
    login: './src/login.js',
    vendor: [
      './lib/plugins/jQuery/jquery-2.2.3.min.js'
    ]
  },
  watch: true,
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      $: 'jquery',
      jQuery: 'jquery'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              sourceMap: true,
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          // 'style-loader',
          'css-loader',
          'sass-loader' ]
      },
      // {
      //   test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 50000
      //       }
      //     }]
      // }
      {
        test: /\.(png|jpe?g|gif|woff|woff2|eot|ttf|svg)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'image',
          publicPath: '../src/scss/lib/img'
        }
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
      // {
      //   test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      //   use: [{
      //     loader: 'file-loader',
      //     options: {
      //       name: '[name].[ext]',
      //       outputPath: 'fonts/', // where the fonts will go
      //       publicPath: '/fonts' // override the default path
      //     }
      //   }]
      // },
      // {
      //   test: /\.(png|jpe?g|gif)$/i,
      //   use: [{
      //     loader: 'file-loader',
      //     options: {
      //       limit: 50000,
      //       name: '[path][name].[ext]',
      //       outputPath: 'img/', // where the fonts will go
      //       publicPath: '/img' // override the default path
      //     }
      //   }]
      // }
    ]
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: 'style.css'
    // })
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    }),
    // new BundleAnalyzerPlugin()
    // new CompressionPlugin({
    //   test: /\.js(\?.*)?$/i
    // })
  ]
}
