const Boom = require( '@hapi/boom' )
const { ValidationError } = require( 'yup' )

const logger = require( '../../config/logger' )
const { comparePassword } = require( '../../utils/password' )
const { User } = require( '../users/model' )
const { signUpSchema, signInSchema } = require( './schema' )
const { formatValidationError } = require( '../../utils/error' )

const validateSignUp = async ( req, res, next ) => {
  try {
    await signUpSchema.validate( req.body, { abortEarly: false } )
    return next()
  } catch ( error ) {
    logger.error( 'Error in validateSignUp', error )
    if ( error instanceof ValidationError ) {
      const validationError = formatValidationError( error )
      return res.boom( Boom.badRequest( 'Unable to validate sign up data', { data: validationError } ) )
    }
    return res.boom( Boom.badImplementation( 'Unable to signup' ) )
  }
}

const isUserAlreadyExist = async ( req, res, next ) => {
  try {
    const user = await User.findOne( { email: req.body.email } )
    if ( user !== null ) {
      return res.boom( Boom.forbidden( 'Unable to signup. The email has already been taken' ) )
    }
    return next()
  } catch ( error ) {
    logger.error( 'Error in isUserAlreadyExist', error )
    return res.boom( Boom.badImplementation( 'Unable to authenticate the user' ) )
  }
}

const validateLogin = async ( req, res, next ) => {
  try {
    await signInSchema.validate( req.body, { abortEarly: false } )
    return next()
  } catch ( error ) {
    logger.error( 'Error in validateLogin', error )
    if ( error instanceof ValidationError ) {
      const validationError = formatValidationError( error )
      return res.boom( Boom.badRequest( 'Unable to validate login data', { data: validationError } ) )
    }
    return res.boom( Boom.badImplementation( 'Unable to login' ) )
  }
}

const isEmailExist = async ( req, res, next ) => {
  try {
    const userData = await User.findOne( { email: req.body.email } ).select( '+password' )
    if ( userData === null ) {
      return res.boom( Boom.unauthorized( 'Invalid user credentials' ) )
    }
    req.userData = userData
    next()
  } catch ( error ) {
    logger.error( 'Unable to check email', error )
    return res.boom( Boom.badImplementation( 'Unable to check email' ) )
  }
}

const isPasswordCorrect = async ( req, res, next ) => {
  try {
    const isPasswordCorrect = await comparePassword( req.body.password, req.userData.password )
    if ( !isPasswordCorrect ) {
      return res.boom( Boom.unauthorized( 'Invalid user credentials' ) )
    }
    next()
  } catch ( error ) {
    logger.error( 'Unable to check password', error )
    return res.boom( Boom.badImplementation( 'Unable to check password' ) )
  }
}

module.exports = {
  validateSignUp,
  validateLogin,
  isUserAlreadyExist,
  isEmailExist,
  isPasswordCorrect,
}
