import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUserDocument extends Document {
  _id: Types.ObjectId;
  name: string,
  email: string,
  password: string,
  role: string,
  condition: string
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  condition: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  }
}, {
  collection: "Users",
  timestamps: true
});


UserSchema.index({ role: 1 });

export default mongoose.model<IUserDocument>('User', UserSchema);