const Boom = require( '@hapi/boom' )

const { getToken, verifyAuthToken } = require( '../../apps/auth/utils' )
const logger = require( '../../config/logger' )

const authenticationMiddleware = async function ( req, res, next ) {
  try {
    const token = getToken( req )
    if ( token === null ) {
      return res.boom( Boom.unauthorized( 'Unable to authenticate user' ) )
    }

    const decodedToken = await verifyAuthToken( token ).catch( ( error ) => {
      logger.error( error )
      return res.boom( Boom.forbidden( 'Invalid token' ) )
    } )
    req.userData = {
      id: decodedToken.user_id,
    }
    return next()
  } catch ( error ) {
    logger.error( `Error while authenticating: ${error}` )
    return res.boom( Boom.badImplementation( 'Unable to authenticate user' ) )
  }
}

module.exports = {
  authenticationMiddleware,
}
