const yup = require( 'yup' )

const { USER_PASSWORD_REGEX } = require( '../../constants' )

const signUpSchema = yup.object( {
  name: yup
    .string( 'Name must be a string.' )
    .min( 3, 'Name can\'t be less than 3 characters' )
    .max( 150, 'Name can\'t be more than 150 characters' )
    .required( 'Name cannot be empty.' ),
  email: yup
    .string( 'Email must be a string.' )
    .email( 'Entered email is not valid.' )
    .max( 50, 'Email can\'t more than 50 characters' )
    .required( 'Email cannot be empty.' ),
  password: yup
    .string( 'Password must be string' )
    .min( 8, 'Password is too short - should be minimum 8 characters.' )
    .max( 200, 'Password can\'t be more than 200 characters' )
    .matches( USER_PASSWORD_REGEX, 'Use lowercase, uppercase letter, number and special character.' )
    .required( 'Password cannot be empty' ),
  age: yup
    .string( 'Age must be a string.' )
    .min( 1, 'Age can\'t be less than 1' )
    .required( 'Age cannot be empty.' ),
} )

const signInSchema = yup.object( {
  email: yup
    .string( 'Email must be a string.' )
    .email( 'Entered email is not valid.' )
    .required( 'Email cannot be empty.' ),
  password: yup
    .string( 'Password must be string' )
    .min( 8, 'Password is too short - should be minimum 8 characters.' )
    .required( 'Password cannot be empty' ),
} )

module.exports = {
  signUpSchema,
  signInSchema,
}
