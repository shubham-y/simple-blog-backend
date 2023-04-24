const httpStatus = require( 'http-status' )
const Boom = require( '@hapi/boom' )

const logger = require( '../../config/logger' )
const { User } = require( './model' )

const updateUser = async ( req, res ) => {
  try {
    const userId = req.params.user_id
    const updatedUser = await User.findByIdAndUpdate( userId, {
      name: req.body.name,
      age: req.body.age,
    },
    )

    return res.status( httpStatus.OK ).json( {
      statusCode: httpStatus.OK,
      message: 'Successfully updated the user',
      data: {
        data: updatedUser,
      },
      error: null,
    },
    )
  } catch ( error ) {
    logger.error( 'Error in updateUser', error )
    return res.boom( Boom.badImplementation( 'Unable to updateUser' ) )
  }
}

module.exports = {
  updateUser,
}
