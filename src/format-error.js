export default options => error => {
  console.log(JSON.stringify(error))
  if (options.noExtensions) delete error.extensions
  return error
}
