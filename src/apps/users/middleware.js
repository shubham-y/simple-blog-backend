const Boom = require( '@hapi/boom' )
const { ValidationError } = require( 'yup' )

const logger = require( '../../config/logger' )
const { updateUserSchema } = require( './schema' )
const { formatValidationError } = require( '../../utils/error' )

const validateUpdateUser = async ( req, res, next ) => {
  try {
    await updateUserSchema.validate( req.body, { abortEarly: false } )
    next()
  } catch ( error ) {
    logger.error( 'Error in validateUpdateUser', error )
    if ( error instanceof ValidationError ) {
      const validationError = formatValidationError( error )
      return res.boom( Boom.badRequest( 'Unable to validate update user data', { data: validationError } ) )
    }
    return res.boom( Boom.badImplementation( 'Unable to update user' ) )
  }
}

module.exports = {
  validateUpdateUser,
}
