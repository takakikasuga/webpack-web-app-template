const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

module.exports = {
  mode: 'development',
  //エントリポイント（デフォルトと同じなので省略可）
  entry: './src/scss/style.scss',
  //出力先（デフォルトと同じなので省略可）
  output: {
    path: path.resolve(__dirname, 'src/dist')
  },
  devServer: {
    static: {
      directory: path.join(__dirname, './src')
    },
    hot: true,
    port: 9000
  },
  module: {
    rules: [
      // 追加
      {
        test: /\.(scss|sass|css)$/i,
        use: [
          // cssファイルとして別ファイルに出力する
          MiniCssExtractPlugin.loader,
          // cssをCommonJS形式に変換してjavaScriptで扱えるようにする
          'css-loader',
          {
            // PostCSSでcssを処理する
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                // ベンダープレフィックスを自動付与する
                plugins: [require('autoprefixer')({ grid: true })]
              }
            }
          },
          {
            // sassをコンパイルしてcssに変換する
            loader: 'sass-loader',
            options: {
              // Dart Sassを使えるようにする
              implementation: require('sass')
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'about.html',
      template: 'src/about.html'
    }),
    new RemoveEmptyScriptsPlugin()
  ],
  //source-map タイプのソースマップを出力
  devtool: 'source-map',
  // node_modules を監視（watch）対象から除外
  watchOptions: {
    ignored: /node_modules/ //正規表現で指定
  }
};
