
const bcrypt = require("bcrypt");
const Users = require("../models/userModel");
const Chats = require("../models/chatModel");
require("dotenv").config()


//Register API
//@route POST /api/users/register

const registerUser = async (req, res) => {


    try {
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const img = req.file.filename
        if (!name || !email || !password || !img) {

            return res.status(500).json("All data required")

        }
        else {
            const userAvailabe = await Users.findOne({ email: email })
            // console.log(userAvailabe);
            if (userAvailabe) {
                return res.json("User already Exist")
            }

            else {
                const encryptPass = await bcrypt.hash(password, 10)
                const user = new Users(
                    {
                        name: name,
                        email: email,
                        image: 'images/' + img,
                        password: encryptPass
                    })
                await user.save()


                // res.status(200).json({ user }) 
                const message = "Registration Successfull..."
                res.render("register", { message })

            }
        }
    }
    catch (err) {
        console.log(err);
    }

}




const registerLoad = async (req, res) => {
    try {
        return res.render("register")
    } catch (error) {
        console.log(error);
        // res.status(500).json(error)
    }
}



const loadLogin = async (req, res) => {
    try {
        return res.render("login")
    } catch (error) {
        console.log(error);
        // res.status(500).json(error)
    }
}

const login = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const user = await Users.findOne({ email: email })
        if (user) {
            const validPass = await bcrypt.compare(password, user.password)
            console.log(validPass);
            if (validPass) {
                req.session.user = user;
                return res.redirect('/dashboard')
            }
            else {
                res.render('login', { message: "Email or Password is Wrong!!" })
            }
        }
        else {
            res.render('login', { message: "Email or Password is Wrong!!" })
        }
    }
    catch (error) {
        console.log(error);
        // res.status(500).json(error)
    }
}

const logout = async (req, res) => {
    try {
        req.session.destroy();
        res.redirect('/')
    } catch (error) {
        console.log(error);
        // res.status(500).json(error)
    }
}

const loadDashboard = async (req, res) => {
    try {

        var users = await Users.find({ _id: { $nin: (req.session.user._id) } })
        return res.render('dashboard', { user: req.session.user, users: users })
    } catch (error) {
        console.log(error);
        // res.status(500).json(error)
    }
}

const saveChat = async (req, res) => {
    try {
        console.log(req.body);
        console.log('save chat');
        var chat = new Chats({

            sender_id: req.body.sender_id, 
            receiver_id: req.body.receiver_id,
            message: req.body.message

        })

        var newChat = await chat.save()
        console.log(newChat);
        res.status(200).send({ success: true, msg: "Chat Inserted!!", data: newChat })

    } catch (error) {

        res.status(400).json({ msg: error.message })

    }
}



const deleteChat = async(req,res)=>{
    try {

       const d = await Chats.deleteOne({_id:req.body.id})
       console.log(d);
       res.status(200).json({success:true})
        
    } catch (error) {
        res.status(400).json({ msg: error.message })
        
    }
}

const updateChat = async(req,res)=>{
    try {

       await Chats.findByIdAndUpdate({_id:req.body.id},{
        $set:{
            message:req.body.message     
        }
       })
       res.status(200).json({success:true})
        
    } catch (error) {
        res.status(400).json({ msg: error.message })
        
    }
}


const redirectfun = async (req, res) => {
    res.redirect('/')
}

module.exports = { registerUser, registerLoad, loadLogin, login, logout, loadDashboard, redirectfun, saveChat, deleteChat, updateChat }         