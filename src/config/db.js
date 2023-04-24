const mongoose = require( 'mongoose' )

const logger = require( './logger' )

const connectDb = async () => {
  try {
    const mongoClient = await mongoose.connect( process.env.DATABASE_URL )
    logger.info( `MongoDB Connected: ${mongoClient.connection.host}` )
  } catch ( error ) {
    logger.error( `Error: ${error.message}` )
    process.exit( 1 )
  }
}

module.exports = {
  connectDb,
}
