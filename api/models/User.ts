import * as mongoose from 'mongoose';

mongoose.connect(`localhost:27017/${process.env.DATABASE}`, (err) => {
  if (err) throw err;
  if (process.env.NODE_ENV == 'development') console.log('Mongo connected');
})

export interface IUser extends mongoose.Document {
  login: string
  password: string
};

export const UserSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true, lowercase: true, index: true },
  password: { type: String, required: true }
});

const User = mongoose.model<IUser>('user', UserSchema);
export default User;