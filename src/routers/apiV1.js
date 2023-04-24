const express = require( 'express' )

const authRouter = require( '../apps/auth/routes' )
const articleRouter = require( '../apps/articles/routes' )
const userRouter = require( '../apps/users/routes' )

const apiV1Router = express.Router()

apiV1Router.use( authRouter )
apiV1Router.use( articleRouter )
apiV1Router.use( userRouter )

module.exports = apiV1Router
