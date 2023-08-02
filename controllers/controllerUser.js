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
    const usernameValid = new RegExp(/^(?=(?:[0-9_]*[a-z]){3})[a-z0-9_]{5,}$/);
    const passwordValid = new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*_)(?!.*\W)(?!.* ).{8,16}$/);

    try {
        if(req.body.username == undefined || req.body.name == undefined || req.body.password == undefined) {
            throw "Fill all the required fields"
        }       
        User.find({username: req.body.username})
        .then(async (dbUser) => {
            if(dbUser.length == 0) {
                const hashedPassword = await bcrypt.hash(req.body.password, 10)
                const user = {...req.body, password: hashedPassword}
                try {
                    if(usernameValid.test(req.body.username) == false) {
                        throw "Username must be at least 5-characters long(no less than 3 characters of that length must be letters), no spaces, and may consist only of lowercase letters, numbers, and underscores."
                    } 
                    if(passwordValid.test(req.body.password) == false) {
                        throw "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one underscore but no other special character, no space and it must be 8-16 characters long."
                    } 
                    await new User(user).save()
                    .then(() => res.status(200).json({msg: "User saved"}))
                    .catch((err) => res.sendStatus(500));
                } catch (error) {
                    res.status(403).json({msg: error})
                }                
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
    const status = req.query.status;
    let valid = new RegExp(`${searchKey.toLowerCase()}`);
    User.find()
    .then((users) => {   
        try {            
            let filtered;
            if(status == "full") {
                filtered = users.filter((user) => {  
                    return (
                    (
                        valid.test(user.username.toLowerCase()) == true || 
                        valid.test(user.name.first.toLowerCase()) == true || 
                        valid.test(user.name.last.toLowerCase()) == true ||
                        valid.test(user.name.first.toLowerCase() + " " + user.name.last.toLowerCase()) == true
                    ) 
                    && user._id.toString() !== id) 
                })
            } else {
                filtered = users.filter((user) => {  
                    return (valid.test(user.username.toLowerCase()) == true && user._id.toString() !== id) 
                })
            }
           
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
