import { CHATBOTURL } from "../Config/constants";
import { IUser } from "../types/IUser";
export class ChatbotService {
  public async send(message:string, user: IUser){
    if (!CHATBOTURL) throw new Error("No hay ruta para el chatbot.")
      console.log("user",user._id)
    const result = await fetch(CHATBOTURL, {
        method: "POST",
        headers:{
          "Content-Type":"Application/JSON"
        },
        body:JSON.stringify({
            message: message,
            sessionId: `${user._id}`
        })
    })
    return await (result.json()).then((json)=>json.output)
  }

}