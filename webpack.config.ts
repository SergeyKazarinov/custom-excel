import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { DotenvParseOutput, configDotenv } from 'dotenv';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import type { Configuration } from 'webpack';

const env: DotenvParseOutput | undefined = configDotenv().parsed;
const isProd: boolean = env?.NODE_ENV === 'production';
const fileName = (ext: 'css' | 'js') => (isProd ? `[name].[contenthash].${ext}` : `[name].${ext}`);

export default (env: any) => {
  const config: Configuration = {
    context: path.resolve(__dirname, 'src'),
    entry: './index.ts',
    mode: 'development',
    output: {
      filename: fileName('js'),
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },

    plugins: [
      new webpack.ProgressPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
        minify: {
          removeComments: isProd,
          collapseWhitespace: isProd,
        },
      }),
      new CopyPlugin({
        patterns: [
          { from: path.resolve(__dirname, 'public', 'assets'), to: path.resolve(__dirname, 'dist', 'assets') },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: fileName('css'),
      }),
    ],

    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 3000,
      hot: !isProd,
    },

    devtool: isProd ? false : 'source-map',

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
