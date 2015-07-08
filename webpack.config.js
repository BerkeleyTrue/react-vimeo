var webpack = require('webpack');

var banner = require('./banner');

module.exports = {

  output: {
    library: 'ReactVimeo',
    libraryTarget: 'umd'
  },

  externals: [
    {
      'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    }
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  node: {
    Buffer: false
  },

  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx'
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.BannerPlugin(banner, { raw: true, entryOnly: true })
  ]
};
