import * as mongoose from 'mongoose';
export interface INewpass extends mongoose.Document {
  id: string
  newpass: string
};

export var NewpassSchema = new mongoose.Schema({
  id: { type: String, required: true },
  newpass: { type: String, required: true },
});

export const Newpass = mongoose.model<INewpass>('forgotpass', NewpassSchema);