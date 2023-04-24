const bcrypt = require( 'bcryptjs' )

const SALT_ROUNDS = 12

const hashPassword = async ( password ) => {
  const hashedPassword = await bcrypt.hash( password, SALT_ROUNDS )
  return hashedPassword
}

const hashPasswordSync = ( password ) => {
  const hashedPassword = bcrypt.hashSync( password, SALT_ROUNDS )
  return hashedPassword
}

const comparePassword = async ( plaintextPassword, hash ) => {
  const result = await bcrypt.compare( plaintextPassword, hash )
  return result
}

module.exports = {
  hashPassword,
  hashPasswordSync,
  comparePassword,
}
