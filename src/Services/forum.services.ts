import commentSchema from "../Models/forum.model"
export class ForumServices {
  private toForumResponse(comment: any): any {
    return {
        _id: comment._id.toString(),
        text: String,
        archive: String,
        relaId: comment.relaId.toString()
    };
  }

  public async addComment(comment: any){
    const hola = await commentSchema.create(comment)
    return hola
  }
  public async filterComments(field: string, value: string){
    const comments = await commentSchema.find({group: value})
    return comments
  }
  public async getComments() {
    const comments = await commentSchema.find()
    return comments
  }
}
