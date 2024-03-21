const express = require("express")
const dotenv = require("dotenv")
const path = require("path")
const dbConnection = require("./DB/db.js")
dotenv.config()
const app = express()
const userRoutes = require("./Routes/userRoutes");
const session = require("express-session")
const {SESSION_SECRET}  = process.env




app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.set('views',path.resolve("./views"))
app.use(express.static('Public'))
app.use(session({secret:SESSION_SECRET}))

dbConnection()

app.use("/", userRoutes)






module.exports = app