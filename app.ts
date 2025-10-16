import express from "express"
import morgan from "morgan"
import database from "./src/Config/database"
import authRoutes from "./src/Routes/auth.routes"
import forumRoutes from "./src/Routes/forum.routes"
import cors from "cors"


const app = express()
const PORT = 4000

app.use(morgan("dev"))
app.use(express.json())
app.use(cors({
    methods: ["POST","GET","PATCH"],
    credentials:true, 
    origin: ["http://localhost:5173"]
}))
app.get("/",(req,res)=>{
    res.send("Servidor funcionando")
})

database.conectar()
app.use(authRoutes)
app.use("/comments/",forumRoutes)
app.listen(PORT,()=>{
    console.log("El servidor está corriendo en el puerto: ", PORT)
})
