const express = require( 'express' )

const { updateUser } = require( './controller' )
const {
  validateUpdateUser,
} = require( './middleware' )

const usersRouter = express.Router()

usersRouter.post( '/users/:user_id([0-9a-fA-F]{24})', validateUpdateUser, updateUser )

module.exports = usersRouter
