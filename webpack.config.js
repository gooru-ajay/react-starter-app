const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@providers': path.resolve(__dirname, 'src/providers/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@models': path.resolve(__dirname, 'src/models/'),
      '@app': path.resolve(__dirname, 'src/app/'),
      '@icons': path.resolve(__dirname, 'src/assets/icons/'),
      '@styles': path.resolve(__dirname, 'src/assets/scss/'),
      '@images': path.resolve(__dirname, 'src/assets/images/')
    }
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.min.js'
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.scss$/i,
      use: ['style-loader', 'css-loader'],
    }, {
      test: /\.(svg|png|jpe?g|gif)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name(file) {
            if (process.env.NODE_ENV === 'development') {
              return '[path][name].[ext]';
            }
            return '[contenthash].[ext]';
          }
        }
      }],
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}
