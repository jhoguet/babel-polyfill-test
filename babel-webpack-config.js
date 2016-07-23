var webpack = require("webpack");

module.exports = {
    entry: ['babel-polyfill', "./babel-index.js"],
    output: {
        path: __dirname + "/dist",
        filename: "babel-index.js"
    }
};
