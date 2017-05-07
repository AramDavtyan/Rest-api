import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
const SALT_WORK_FACTOR = 10;

export interface IUser extends mongoose.Document {
  firstname: string
  lastname: string
  login: string
  email: string
  password: string
  access_token?: string
};

export var UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  login: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
});

UserSchema.pre('save', function (next) {
  let user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});




export const User = mongoose.model<IUser>('user', UserSchema);
