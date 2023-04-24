const httpStatus = require( 'http-status' )
const Boom = require( '@hapi/boom' )

const logger = require( '../../config/logger' )
const { Article } = require( './model' )

const createArticle = async ( req, res ) => {
  try {
    const userId = req.params.user_id
    const article = await Article.create( {
      title: req.body.title,
      description: req.body.description,
      authorId: userId,
    } )

    return res.status( httpStatus.OK ).json( {
      statusCode: httpStatus.OK,
      message: 'Successfully created article',
      data: {
        data: article,
      },
      error: null,
    },
    )
  } catch ( error ) {
    logger.error( 'Error in createArticle', error )
    return res.boom( Boom.badImplementation( 'Unable to createArticle' ) )
  }
}

const getArticles = async ( req, res ) => {
  try {
    const articles = await Article.find().populate( {
      path: 'authorId',
      select: 'name email age',
    } )

    return res.status( httpStatus.OK ).json( {
      statusCode: httpStatus.OK,
      message: 'Successfully fetched all articles',
      data: {
        data: articles,
      },
      error: null,
    },
    )
  } catch ( error ) {
    logger.error( 'Error in getArticles', error )
    return res.boom( Boom.badImplementation( 'Unable to get all articles' ) )
  }
}

module.exports = {
  createArticle,
  getArticles,
}
