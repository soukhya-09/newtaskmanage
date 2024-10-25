const express = require("express")

const { signup, login, logout } = require("./UserRoutes")
const { auth } = require("./Auth")
const routeruser = express.Router()

routeruser.post("/signup",signup)
routeruser.post("/login",login)
routeruser.get("/logout",auth,logout)

module.exports = routeruser