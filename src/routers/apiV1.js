const express = require( 'express' )

const authRouter = require( '../apps/auth/routes' )

const apiV1Router = express.Router()

apiV1Router.use( '/auth', authRouter )

module.exports = apiV1Router
