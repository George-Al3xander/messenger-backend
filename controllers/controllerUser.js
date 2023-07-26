const User = require("../models/modelUser.js")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")


const get_all = (req, res) => {
    User.find()
    .then((result) => res.json())
}

const user_register = async (req, res) => {
    try {
        if(req.body.username == undefined || req.body.name == undefined || req.body.password == undefined) {
            throw "Fill all the required fields"
        }       
        User.find({username: req.body.username})
        .then(async (dbUser) => {
            if(dbUser.length == 0) {
                const hashedPassword = await bcrypt.hash(req.body.password, 10)
                const user = {...req.body, password: hashedPassword}
                await new User(user).save()
                .then(() => res.status(200).json({msg: "User saved"}))
                .catch((err) => res.sendStatus(500));
            } else {
                res.status(403).json({msg: "username taken"})
            }
        })  
    } catch (error) {
        res.status(400).json({error})
    }
}

const user_login = async (req, res) => {
    User.find({username: req.body.username})
    .then(async (user) => {
        if(user.length != 0) {
        user = user[0];
           try {
                if(await bcrypt.compare(req.body.password, user.password)) {
                    jwt.sign({user}, process.env.SECRET_KEY, (err, token) => {
                        res.json({token})
                    });
                } else {
                    res.status(401).json({msg: "Incorrect username or password"})
                }
           } catch (error) {
                res.status(401).json({msg: "Incorrect username or password"})
           }
        } else {
            res.status(401).json({msg: "Incorrect username or password"})
        }        
    })
    .catch((err) => res.json({err}))
}




// -- Verifaction before every function
// jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
//     if(err) {
//         res.sendStatus(403)
//     } else {
//         const {title, text} = req.body
//         const newPost = new Post({
//             title,
//             text,
//             comments: [],
//             publication_status: false,
//             date: new Date()

//         })
//         newPost.save().then(() => res.sendStatus(200))
//     }
// }) 

module.exports = {
    user_register,
    user_login
}
