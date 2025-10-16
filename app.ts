import express from "express"
import morgan from "morgan"
import database from "./src/Config/database"
import authRoutes from "./src/Routes/auth.routes"


const app = express()
const PORT = 4000

app.use(morgan("dev"))
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Servidor funcionando")
})

database.conectar()
app.use(authRoutes)
app.listen(PORT,()=>{
    console.log("El servidor está corriendo en el puerto: ", PORT)
})
