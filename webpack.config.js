const path = require('path')
const nodeExternals = require('webpack-node-externals')

const libraryName = 'aws-apollo-tools'
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
        use: [
          'imports-loader',
          {
            loader: 'babel-loader',
            options: {
              babelrc: true
            }
          }
        ]
      }
    ]
  }
}
