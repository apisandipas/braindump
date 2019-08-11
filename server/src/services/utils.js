export const formatErrors = err => {
  const errors = []
  console.log('formatErrors: inspect error:', JSON.stringify(err))

  // Handle Joi validation errors
  if (err.isJoi && err.name === 'ValidationError') {
    err.details.forEach(e => {
      errors.push({ path: e.path, message: 'Error! ' + e.message })
    })
  }

  // Handle uniqueness constrained fields error from database, This is only known to work on MySQL.
  if (err.code === 'ER_DUP_ENTRY') {
    // TODO - find a better way to deal with these issue and handle them per field.
    errors.push({ path: 'generic', message: 'Duplicate login information. Please try again!' })
  }

  if (!errors.length > 0) {
    errors.push({ path: 'generic', message: 'Something went wrong!' })
  }

  return errors
}
