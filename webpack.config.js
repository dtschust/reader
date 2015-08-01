var webpack = require('webpack')

module.exports = {
    entry: [
      './js/app.jsx'
    ],
    output: {
        path: __dirname,
        filename: 'bundle.js'
      },
    module: {
        loaders: [
            { test: /\.jsx?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?stage=1'},
            { test: /\.less$/, loader: 'style!css!less!autoprefixer' },
            { test: /\.css$/, loader: 'style!css!autoprefixer' },
            { test: /\.json$/, loader: 'json'},
            { test: /\.txt$/, loader: 'raw'}
          ]
      },
    plugins: [
      new webpack.NoErrorsPlugin()
    ],
    resolve: {
      extensions: ['', '.jsx', '.js', '.json', '.less']
    }

  }
