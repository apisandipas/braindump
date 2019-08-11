export const formatErrors = err => {
  console.log('ERRR', err)
  return [{ path: 'generic', message: 'Something went wrong!' }]
}
