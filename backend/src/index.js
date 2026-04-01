import dotenv from "dotenv"
import web from './app.js'
import connectDB from './db/index.js'

dotenv.config({
    path: "../.env"
})
const port = process.env.PORT || 3000

connectDB()
    .then(()=>{
        web.listen(port,()=>{
        console.log(`the server is running on http://localhost:${port}`);    
        });
    })
    .catch((err)=>{
        console.error("MongoDB connection error",err)
        process.exit(1)
    })