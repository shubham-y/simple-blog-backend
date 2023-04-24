const httpStatus = require( 'http-status' )
const Boom = require( '@hapi/boom' )

const logger = require( '../../config/logger' )
const { User } = require( './model' )

const updateUser = async ( req, res ) => {
  try {
    const userId = req.params.user_id
    const response = await User.updateOne( { _id: userId }, {
      name: req.body.name,
      age: req.body.age,
    },
    )
    if ( !response.acknowledged ) {
      throw new Error( 'Unable to update user' )
    }

    return res.status( httpStatus.OK ).json( {
      statusCode: httpStatus.OK,
      message: 'Successfully updated the user',
      data: null,
      error: null,
    },
    )
  } catch ( error ) {
    logger.error( 'Error in updateUser', error )
    return res.boom( Boom.badImplementation( 'Unable to update user' ) )
  }
}

module.exports = {
  updateUser,
}
