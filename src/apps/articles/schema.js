const yup = require( 'yup' )

const createArticleSchema = yup.object( {
  title: yup
    .string()
    .required( 'Title cannot be empty.' ),
  description: yup
    .string()
    .required( 'Description cannot be empty' ),
} )

module.exports = {
  createArticleSchema,
}
