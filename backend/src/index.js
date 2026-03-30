import dotenv from "dotenv"
import web from './app.js'
dotenv.config({
    path: "../.env"
})
const port = process.env.PORT || 3000

web.listen(port,()=>{
    console.log(`the server is running on http://localhost:${port}`);    
}) 