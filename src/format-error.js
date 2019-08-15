export default options => error => {
  error.message = formatMessage(error, options)
  console.log(JSON.stringify(error))
  if (options.noExtensions) delete error.extensions
  return error
}

const formatMessage = ({ message, path }, { noPath }) => {
  const formattedPath = noPath ? '' : `:${path}`
  return `[${process.env.AWS_LAMBDA_FUNCTION_NAME}${formattedPath}] ${message}`
}
