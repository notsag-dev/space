module.exports = {
    entry: "./space.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
        { test: /\.css$/, loader: "style!css" }
        ]
    }
};
