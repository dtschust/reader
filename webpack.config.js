var webpack = require('webpack')

module.exports = {
    entry: [
      'webpack/hot/only-dev-server',
      './js/app.jsx'
    ],
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
      },
    module: {
        loaders: [
            { test: /\.jsx?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?stage=1'},
            { test: /\.less$/, loader: 'style!css!less' },
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.json$/, loader: 'json'}
          ]
      },
    plugins: [
      new webpack.NoErrorsPlugin()
    ],
    resolve: {
      extensions: ['', '.jsx', '.js', '.json', '.less']
    }

  }
