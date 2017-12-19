const mongoose        = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

// User Schema
const UserSchema = mongoose.Schema({
  email:{ type: String, unique: true, required: true },
  password:{ type: String, required: true }
});

UserSchema.plugin(uniqueValidator)

const User = module.exports = mongoose.model('User', UserSchema);
