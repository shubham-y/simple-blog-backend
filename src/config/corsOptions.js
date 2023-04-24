const dotenv = require( 'dotenv' )
const httpStatus = require( 'http-status' )

dotenv.config()

const allowedOriginList = '*'
const allowedMethods = process.env.CORS_METHODS

const corsOptions = {
  origin: allowedOriginList,
  methods: allowedMethods,
  preflightContinue: false,
  optionsSuccessStatus: httpStatus.NO_CONTENT,
}

module.exports = { corsOptions }
