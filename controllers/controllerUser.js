const User = require("../models/modelUser.js")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")


const get_all = (req, res) => {
    User.find()
    .then((result) => res.json())
}

const get_user_current = async (req, res) => {
    try {
        let data = await jwt.decode(req.token, process.env.SECRET_KEY)
        let user = data.user
        delete user.password
        res.json(user)        
    } catch (error) {
        res.json({msg: error})
    }   
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
                res.status(403).json({msg: "That user already exists"})
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
        delete user.password
           try {
                if(await bcrypt.compare(req.body.password, user.password)) {
                    jwt.sign({user}, process.env.SECRET_KEY, (err, token) => {
                        res.json({user,token})
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

const user_search = (req, res) => {
    const searchKey = req.query.searchKey;
    const id = req.params.id;
    let valid = new RegExp(`${searchKey.toLowerCase()}`);
    User.find()
    .then((users) => {   
        try {
            const filtered = users.filter((user) => {  
                return (valid.test(user.username.toLowerCase()) == true && user._id.toString() !== id) 
            })
            const result = filtered.map((fil) => {
            return {name: fil.name, id: fil._id, username: fil.username}
            })
            res.json({data: result})
        } catch (error) {
            res.status(400).json({msg: "Something went wrong"})
        }
    })
    .catch(() => res.status(400).json({msg: "Something went wrong"}))
}

module.exports = {
    user_register,
    user_login,
    user_search,
    get_user_current
}
