const Room = require("../models/modelRoom.js")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")




const create_room = async (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
            try {
                if(req.body.participants == undefined || req.body.participants.length < 1) {
                    throw "Fill all the required fields"
                }
                if(err) {
                    res.status(498).json("Invalid token")
                } else {
                   await new Room(req.body).save()
                   .then(() => res.json("Room created!"))
                   .catch(( ) =>  res.status(404).json({msg: "Error, can`t create("}))
                }
            } catch (error) {
                res.status(400).json({error})
                
            }
        }) 
}


const get_all = (req, res) => {
    
}




module.exports = {
    create_room
}

