// const express = require("express");
// const webpack = require("webpack");
// const webpackDevMiddleware = require("webpack-dev-middleware");
// const config = require("../webpack.config");

// // import webpack from "webpack";
// // import webpackDevMiddleware from webpack-dev-middleware;
// // import config from "../webpack.config";

// const app = express();
// const compiler = webpack(config());

// // Tell express to use the webpack-dev-middleware and use the webpack.config.js
// // configuration file as a base.
// app.use(
//   webpackDevMiddleware(compiler, {
//     publicPath: config.output.publicPath
//   })
// );

// // Serve the files
// app.listen(55555, function() {
//   console.log("Example app listening on port 55555!\n");
// });

import path from "path";
import express from "express";

const app = express(),
  DIST_DIR = __dirname,
  HTML_FILE = path.join(DIST_DIR, "index.html");

app.use(express.static(DIST_DIR));
app.get("*", (req, res) => {
  res.sendFile(HTML_FILE);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log("Press Ctrl+C to quit.");
});
