import express from 'express'
import cors from 'cors'
const web = express()

// these are the bare minimum configurations
web.use(express.json({limit: "16kb"}))
web.use(express.urlencoded({extended: true,limits:"16kb"}))
web.use(express.static('public'))

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

web.use('/api/v1/healthcheck',healthcheckrouter)




web.get('/',(req,res)=>{
    res.send("this is the home page")
})

export default web;