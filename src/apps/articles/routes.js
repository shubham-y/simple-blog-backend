const express = require( 'express' )

const { createArticle, getArticles } = require( './controller' )
const {
  validateCreateArticle,
} = require( './middleware' )
const { authenticationMiddleware } = require( '../../common/middleware/auth' )

const articleRouter = express.Router()

articleRouter.all( '*', authenticationMiddleware )

articleRouter.get( '/articles', getArticles )
articleRouter.post( '/users/:user_id([0-9a-fA-F]{24})/articles', validateCreateArticle, createArticle )


module.exports = articleRouter
