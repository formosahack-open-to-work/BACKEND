import mongoose, { Schema, Types } from "mongoose";

export interface IMessageDocument extends Document {
  _id: Types.ObjectId;
}


const MessageSchema: Schema = new Schema({
  from: {
    type: Types.ObjectId,
    required: true,
    trim: true
  },
  to:{
    type:Types.ObjectId,
    required: true,
    trim: true 
  },
  message:{
    type:String,
    required:true,
    trim: true
  }
}, {
  collection: "Messages",
  timestamps: true
});


MessageSchema.index({ role: 1 });

export default mongoose.model<IMessageDocument>('Messages', MessageSchema);