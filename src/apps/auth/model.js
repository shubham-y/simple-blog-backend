const mongoose = require( 'mongoose' )

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 150,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    age: {
      type: Number,
      min: 1,
      required: true,
    },
  },
  { timestamps: true },
)

const User = mongoose.model( 'User', userSchema )

module.exports = {
  User,
}
