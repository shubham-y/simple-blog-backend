const jwt = require( 'jsonwebtoken' )

// eslint-disable-next-line camelcase
const generateAuthToken = ( { user_id } ) => {
  const options = {
    algorithm: 'HS256',
    expiresIn: process.env.TOKEN_TTL,
  }
  // eslint-disable-next-line camelcase
  const payload = { user_id }
  return new Promise( ( resolve, reject ) => {
    jwt.sign( payload, process.env.SECRET_KEY, options, ( err, token ) => {
      if ( err ) {
        reject( err )
      }
      resolve( token )
    } )
  } )
}

const verifyAuthToken = ( token ) => {
  const options = {
    algorithms: [ 'HS256' ],
  }
  return new Promise( ( resolve, reject ) => {
    jwt.verify( token, process.env.SECRET_KEY, options, ( err, decodedToken ) => {
      if ( err ) {
        reject( err )
      }
      resolve( decodedToken )
    } )
  } )
}

const getToken = ( req ) => {
  if ( req.headers.authorization?.split( ' ' )[0] === 'Bearer' ) {
    return req.headers.authorization.split( ' ' )[1]
  }
  return null
}

module.exports = {
  generateAuthToken,
  verifyAuthToken,
  getToken,
}
