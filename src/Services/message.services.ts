import messageSchema from "../Models/message.model"
import { IUser } from "../types/IUser";
export class MessageServices {
  private toForumResponse(comment: any): any {
    return {
        _id: comment._id.toString(),
        text: String,
        archive: String,
        relaId: comment.relaId.toString()
    };
  }

  public async sendMessage(message:string, from: any, to: any){
    const result = await messageSchema.create({from,to,message})
    return result
  }

  public async getMessages(user: IUser){
    const comments = await messageSchema.find({ $or: [ { from: user._id }, { to: user._id } ] })
    return comments
  }
}