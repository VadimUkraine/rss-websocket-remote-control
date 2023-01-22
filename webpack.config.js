import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const DIRNAME = fileURLToPath(new URL('.', import.meta.url));

const webpackConfig = {
  context: resolve(DIRNAME, 'src'),
  entry: ['./index.js'],
  output: {
    filename: 'bundle.cjs',
    path: resolve(DIRNAME, 'public'),
  },
  resolve: {
    extensions: ['.js'],
  },
  devtool: false,
  plugins: [
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: [
        '/node_modules/',
        '/public/',
        ],
      },
    ],
  },
  target: 'node',
  mode: 'production',
};

export default webpackConfig;
