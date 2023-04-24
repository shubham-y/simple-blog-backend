const http = require( 'http' )
const dotenv = require( 'dotenv' )

const app = require( './src/app' )
const logger = require( './src/config/logger' )
const { UNHANDLED_ERRORS, SERVER_SIGNALS } = require( './src/constants' )

dotenv.config()

const port = Number( process.env.PORT ) || 5000
const host = process.env.HOST

const server = http.createServer( app )

server.listen( port, host, () => {
  logger.info( `SBB app listening on ${host}:${port} with environment ${process.env.NODE_ENV}` )
} )

const responseTimeout = Number( process.env.SERVER_TIMEOUT ) || 90000 // response timeout

server.setTimeout( responseTimeout )

for ( const unhandledError of UNHANDLED_ERRORS ) {
  process.on( unhandledError, ( error ) => {
    logger.error( error )
    process.exit( 1 )
  } )
}

for ( const signal of SERVER_SIGNALS ) {
  process.on( signal, () => {
    logger.info( `${signal} signal received and server is shutting down gracefully` )
    server.close()
    process.exit( 0 )
  } )
}
