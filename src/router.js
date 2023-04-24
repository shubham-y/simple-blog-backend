const express = require( 'express' )
const httpStatus = require( 'http-status' )

// const apiV1Router = require( './routers/apiV1' )

const mainRouter = express.Router()

// mainRouter.use( '/api/v1', apiV1Router )
mainRouter.get( '/healthcheck', ( req, res ) => {
  return res.status( httpStatus.OK ).json( {
    pid: process.pid,
    date: new Date(),
    uptime: process.uptime(),
    message: 'SBB server is working fine',
  } )
} )
mainRouter.all( '*', ( req, res, next ) => {
  return res.status( httpStatus.NOT_FOUND ).json( {
    error: `Route ${req.originalUrl} not found`,
  } )
} )

module.exports = mainRouter
