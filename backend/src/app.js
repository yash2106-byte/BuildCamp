import express from 'express'

const web = express()

web.get('/',(req,res)=>{
    res.send("this is the home page")
})

export default web;