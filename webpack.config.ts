import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// eslint-disable-next-line
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'; // необходим для корректной работы типов
import type { Configuration } from 'webpack';

const fileName = (ext: 'css' | 'js', isProduction: boolean): string =>
  isProduction ? `[name].[contenthash].${ext}` : `[name].${ext}`;
interface IEnvWebpack {
  mode: 'development' | 'production';
}

// eslint-disable-next-line
export default (env: IEnvWebpack) => {
  const isProduction = env?.mode === 'production';
  const config: Configuration = {
    context: path.resolve(__dirname, 'src'),
    entry: './index.ts',
    mode: 'development',
    output: {
      filename: fileName('js', isProduction),
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },

    plugins: [
      new webpack.ProgressPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
        minify: {
          removeComments: isProduction,
          collapseWhitespace: isProduction,
        },
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'public', 'assets'),
            to: path.resolve(__dirname, 'dist', 'assets'),
          },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: fileName('css', isProduction),
      }),
    ],

    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 3000,
      hot: !isProduction,
    },

    devtool: isProduction ? false : 'source-map',

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          exclude: /node_modules/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },

    resolve: {
      extensions: ['.js', '.ts'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@core': path.resolve(__dirname, 'src', 'core'),
      },
    },
  };

  return config;
};
