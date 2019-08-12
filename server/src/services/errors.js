import { wrapError, UniqueViolationError } from 'db-errors'

export const formatErrors = err => {
  const errors = []

  // Handle Joi validation errors
  if (err.isJoi && err.name === 'ValidationError') {
    err.details.forEach(e => {
      errors.push({ path: e.path, message: 'Error! ' + e.message })
    })
  }

  // Normalize db errors across drivers
  err = wrapError(err)

  // Handle normalized uniqueness errors
  if (err instanceof UniqueViolationError) {
    if (err.client === 'mysql') {
      errors.push({ path: 'generic', message: 'Duplicate login information. Please try again!' })
    } else {
      err.columns.forEach(column => {
        errors.push({
          path: column,
          message: `Error! Your must pick a unique ${column}`
        })
      })
    }
  }

  if (!(errors.length > 0)) {
    errors.push({ path: 'generic', message: 'Something went wrong!' })
  }

  return errors
}
