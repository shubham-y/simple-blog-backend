const yup = require( 'yup' )

const updateUserSchema = yup.object( {
  name: yup
    .string()
    .min( 3, 'Name can\'t be less than 3 characters' )
    .max( 150, 'Name can\'t be more than 150 characters' )
    .required( 'Name cannot be empty.' ),
  age: yup
    .number()
    .min( 1, 'Age can\'t be less than 1' )
    .required( 'Age cannot be empty.' ),
} )

module.exports = {
  updateUserSchema,
}
