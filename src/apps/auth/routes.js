const express = require( 'express' )

const { signup, login } = require( './controller' )
const {
  isEmailExist,
  isPasswordCorrect,
  isUserAlreadyExist,
  validateSignUp,
  validateLogin,
} = require( './middleware' )

const authRouter = express.Router()

authRouter.post( '/auth/signup', validateSignUp, isUserAlreadyExist, signup )
authRouter.post( '/auth/login', validateLogin, isEmailExist, isPasswordCorrect, login )

module.exports = authRouter
