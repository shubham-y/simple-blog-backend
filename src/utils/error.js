const { ValidationError } = require( 'yup' )

const formatValidationError = ( error ) => {
  const formattedError = {}
  if ( error instanceof ValidationError ) {
    if ( error.inner.length === error.errors.length ) {
      for ( let i = 0; i < error.inner.length; i += 1 ) {
        formattedError[error.inner[i].path] = error.errors[i]
      }
    } else {
      formattedError[error.path] = error.errors.join( ' ' )
    }
  }
  return formattedError
}

const createErrorResponse = ( req, res, next ) => {
  res.boom = ( boomError ) => {
    let boomResponse

    if ( boomError.isBoom ) {
      boomError.output.payload.message = boomError.message
        ? boomError.message
        : boomError.output.payload.message
      boomResponse = {
        ...boomError.output.payload,
        ...boomError.data || { data: null },
      }
    } else {
      boomResponse = {
        statusCode: 500,
        error: boomError,
        message: 'Internal Server Error',
      }
    }

    const response = {
      error: boomResponse,
    }

    return res.status( boomResponse.statusCode ).send( response )
  }
  return next()
}

module.exports = {
  formatValidationError,
  createErrorResponse,
}
