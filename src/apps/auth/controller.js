const httpStatus = require( 'http-status' )
const Boom = require( '@hapi/boom' )

const logger = require( '../../config/logger' )
const { hashPassword } = require( '../../utils/password' )
const { User } = require( './model' )
const { generateAuthToken } = require( './utils' )

const signup = async ( req, res, next ) => {
  try {
    const hashedPassword = await hashPassword( req.body.password )
    const user = await User.create( {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      age: req.body.age,
    } )

    return res.status( httpStatus.OK ).json( {
      statusCode: httpStatus.OK,
      message: 'Successful signup',
      data: {
        data: user,
      },
      error: null,
    },
    )
  } catch ( error ) {
    logger.error( 'Error in signup', error )
    return res.boom( Boom.badImplementation( 'Unable to signup' ) )
  }
}

const login = async ( req, res, next ) => {
  try {
    const token = await generateAuthToken( {
      user_id: req.userData.id,
    } )
    const user = {
      id: req.userData.id,
      name: req.userData.name,
      email: req.body.email,
      created_at: req.userData.created_at,
      updated_at: req.userData.updated_at,
    }

    return res.status( httpStatus.OK ).json( {
      statusCode: httpStatus.OK,
      message: 'Successful login',
      data: {
        data: { token, user },
      },
      error: null,
    },
    )
  } catch ( error ) {
    logger.error( 'Error in login', error )
    return res.boom( Boom.badImplementation( 'Unable to login' ) )
  }
}

module.exports = {
  signup,
  login,
}
