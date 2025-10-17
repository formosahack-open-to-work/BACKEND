import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ICommentDocument extends Document {
  _id: Types.ObjectId;
}

const CommentSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  text: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  archive: {
    type: String,
    required: false,
  },
  group: {
    type: String,
    required: true
  },
  owner: {
    type: Types.ObjectId,
    required: true,
    ref: 'User'
  },
  relaId: {
    type: Types.ObjectId,
    lowercase: true,
  }
}, {
  collection: "Comments",
  timestamps: true
});


CommentSchema.index({ role: 1 });

export default mongoose.model<ICommentDocument>('Comment', CommentSchema);