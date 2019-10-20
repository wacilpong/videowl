const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, options) => {
  const config = {
    // absolute path for src/*
    resolve: {
      modules: [path.join(__dirname, "src"), "node_modules"],

      // alias for specific releative path to absolute path
      // ex) images: path.resolve(__dirname, "src/assets/images")
      alias: {}
    },
    entry: ["./src/index.js"],
    output: {
      path: path.resolve(__dirname, "dist/js"),
      filename: "[name].bundle.js"
    },
    module: {
      rules: [
        // test: A condition that must be met
        // exclude: A condition that must not be met
        // include: An array of paths or files where the imported files will be transformed by the loader
        // loader: A string of “!” separated loaders
        // loaders: An array of loaders as string
        {
          test: /\.js$/,
          include: path.resolve(__dirname, "src"),
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [] // 제안중인 단계에 있는 사양을 지원하기 위한 바벨 플러그인들
            }
          }
        },
        {
          test: /\.scss$/,
          loader: "style-loader!css-loader!sass-loader"
        }
      ]
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all" // initial, async
          }
        }
      }
    }
  };

  if (options.mode === "development") {
    config.plugins = [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        title: "dev",
        template: "./src/index.html",
        showErrors: true
      })
    ];

    config.devtool = "inline-source-map";
    config.devServer = {
      hot: true,
      host: "0.0.0.0",
      contentBase: "./dist",
      stats: {
        color: true
      }
    };
  } else {
    config.plugins = [new CleanWebpackPlugin(["dist"])];
  }

  return config;
};
