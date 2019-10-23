import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from webpack-dev-middleware;
import config from "../webpack.config";

const app = express();
const compiler = webpack(config());

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })
);

// Serve the files
app.listen(55555, function() {
  console.log("Example app listening on port 55555!\n");
});
