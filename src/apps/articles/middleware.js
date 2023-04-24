const Boom = require( '@hapi/boom' )
const { ValidationError } = require( 'yup' )

const logger = require( '../../config/logger' )
const { createArticleSchema } = require( './schema' )
const { formatValidationError } = require( '../../utils/error' )

const validateCreateArticle = async ( req, res, next ) => {
  try {
    await createArticleSchema.validate( req.body, { abortEarly: false } )
    next()
  } catch ( error ) {
    logger.error( 'Error in validateCreateArticle', error )
    if ( error instanceof ValidationError ) {
      const validationError = formatValidationError( error )
      return res.boom( Boom.badRequest( 'Unable to validate create article data', { data: validationError } ) )
    }
    return res.boom( Boom.badImplementation( 'Unable to create article' ) )
  }
}

module.exports = {
  validateCreateArticle,
}
