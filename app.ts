import express from "express"
import morgan from "morgan"
const app = express()
const PORT = 4000

app.use(morgan("dev"))

app.get("/",(req,res)=>{
    res.send("Servidor funcionando")
})

app.listen(PORT,()=>{
    console.log("El servidor está corriendo en el puerto: ", PORT)
})
