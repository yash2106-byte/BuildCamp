import dotenv from "dotenv"
dotenv.config({
    path: "../.env"
})

let username = process.env.NAME
console.log(username)
console.log("your name of the ")