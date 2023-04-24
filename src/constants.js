const UNHANDLED_ERRORS = [ 'uncaughtException', 'unhandledRejection' ]

const SERVER_SIGNALS = [ 'SIGINT', 'SIGTERM', 'SIGHUP' ]

const LOG_TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const LOG_MAX_FILES = '30d' // 30 days
const LOG_MAX_FILE_SIZE = '100m' // 100 MB

const USER_PASSWORD_REGEX = /^[a-zA-Z0-9!@#\\$%\\^&\\*]{8,}$/

module.exports = {
  SERVER_SIGNALS,
  UNHANDLED_ERRORS,
  LOG_TIMESTAMP_FORMAT,
  LOG_MAX_FILES,
  LOG_MAX_FILE_SIZE,
  USER_PASSWORD_REGEX,
}
