const winston = require( 'winston' )
require( 'winston-daily-rotate-file' )

const { LOG_TIMESTAMP_FORMAT, LOG_MAX_FILES, LOG_MAX_FILE_SIZE } = require( '../constants' )

const { format, createLogger, transports } = winston
const { combine, colorize, timestamp, json, printf, errors } = format

function devLogger () {
  const logFormat = printf( ( log ) => {
    return `[${log.timestamp}] [${log.level}] ${log.stack || log.message}`
  } )

  return createLogger( {
    level: 'info',
    format: combine(
      format( log => {
        log.level = log.level.toUpperCase()
        return log
      } )(),
      colorize(),
      timestamp( { format: LOG_TIMESTAMP_FORMAT } ),
      errors( { stack: true } ),
      logFormat,
    ),
    transports: [ new transports.Console() ],
    handleExceptions: true,
    exitOnError: false,
  } )
}

function prodLogger () {
  return createLogger( {
    level: 'info',
    format: combine(
      timestamp(),
      errors( { stack: true } ),
      json(),
    ),
    transports: [
      new transports.Console(),
      new transports.DailyRotateFile( {
        filename: 'logs/app-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        maxSize: LOG_MAX_FILE_SIZE,
        maxFiles: LOG_MAX_FILES,
      } ),
    ],
    handleExceptions: true,
    exitOnError: false,
  } )
}

const logger = process.env.NODE_ENV === 'production' ? prodLogger() : devLogger()

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {

  write ( message, encoding ) {
    logger.info( message )
  },
}

module.exports = logger
