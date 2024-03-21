const express = require("express")
const { registerUser, registerLoad,loadDashboard,loadLogin,login,logout,redirectfun, saveChat, deleteChat, updateChat } = require("../Controllers/userController")
const router = express.Router()
const upload = require("../Middleware/multer.js")
const { isLogout, isLogin } = require("../Middleware/auth.js")





router.get("/register" , isLogout, registerLoad)
router.post("/register", upload.single('image'), registerUser)
router.get('/',isLogout,loadLogin)
router.post("/",login)
router.get('/logout',isLogin,  logout)
router.get("/dashboard",isLogin,loadDashboard)
router.post("/saveChat",saveChat)
router.post("/deleteChat",deleteChat)
router.post("/updateChat",updateChat)

router.get("/*", redirectfun)
module.exports = router

