import express from 'express'
import cors from 'cors'
// Express is not capable to talk with the cookies hence we have to get a "cookie-parser"
import cookieParser from "cookie-parser"

const web = express()

// these are the bare minimum configurations
web.use(express.json({limit: "16kb"}))
web.use(express.urlencoded({extended: true,limits:"16kb"}))
web.use(express.static('public'))
web.use(cookieParser())// this helps express to directly talk with cookies
// cors configurations
web.use(cors({
    origin: process.env.CORSORIGIN?.split(",")|| "http://localhost:5172",
    credentials:true,
    methods:["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
    allowedHeaders:["Authorization","Content-Type"],
    }),
)



// import router form the routes folders
import  healthcheckrouter  from './routes/healthcheck-routes.js'
import authRouter from './routes/auth-route.js'
web.use('/api/v1/healthcheck',healthcheckrouter)
web.use('/api/v1/auth', authRouter)

web.get('/',(req,res)=>{
    res.send("this is the home page")
})

export default web;