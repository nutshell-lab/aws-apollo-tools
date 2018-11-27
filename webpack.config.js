const path = require('path')
const nodeExternals = require('webpack-node-externals')
const libraryName = 'graph-client'
const outputfile = libraryName + '.js'

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: outputfile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      { 
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}