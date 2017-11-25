module.exports = {
    entry: "./adapter.js",
    output: {
        path: __dirname,
        library: 'promiseAdapter',
        filename: "index.js"
    },
    module: {
      loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      }
    ]
  }
}
