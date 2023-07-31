const Room = require("../models/modelRoom.js")
const User = require("../models/modelUser.js")
const Message = require("../models/modelMessage.js")





const create_room = async (req, res) => {  
    const id = req.params.id;     
            try {
                if(req.body.partnerId == undefined) {
                    throw "Fill all the required fields"
                }
                const firstUser = await User.findById(id);
                const secondUser = await User.findById(req.body.partnerId);          
                const participants = [
                    {username: firstUser.username,
                        id: firstUser._id.toString()
                    },
                    {username: secondUser.username,
                        id: secondUser._id.toString()
                    }
                   ]      
                Room.find({participants})
                .then(async (rooms) => {
                    if(rooms.length == 0) {                        
                           await new Room({participants}).save()
                           .then(() => res.json("Room created!"))
                           .catch(( ) =>  res.status(404).json({msg: "Error, can`t create("}))                        
                    } else {
                        res.status(400).json({msg: "Room already exists"})
                    }
                })                
            } catch (error) {
                res.status(400).json({error})                
            }         
}

const get_user_rooms = async (req, res) => {   
    const id = req.params.id; 
    await User.findById(id)
    .then(() => {
        Room.find({participants: {$elemMatch: {id}}})
        .then((rooms) => {           
            res.json(rooms)
        })
        .catch((err) => res.status(404).json({msg: err}))
    })
    .catch(() => res.status(404).json({msg: "User not found!"}));    
}

const get_room = async (req, res) => {
    const id = req.params.id; 
    const roomId = req.params.roomId;

    Room.findById(roomId)
    .then((room) => {
        if(room == null) {
            res.status(400).json({msg: "Invalid room ID"})
        } else {
            res.json(room)
        }        
    })
    .catch(() => res.status(400).json({msg: "Invalid room ID"}))
}

const get_rooms_messages = (req, res) => {
    const roomId = req.params.roomId;
    Message.find({roomId})
    .then((messages) => res.json(messages))
    .catch(() => res.status(400).json({msg: "Invalid room ID"}))
}

const delete_room = async (req, res) => {    
    const roomId = req.params.id;
    Room.findByIdAndDelete(roomId)
    .then(() => {
        Message.deleteMany({roomId})
        .then(() => {res.json("Room deleted")})
        .catch((err) => res.json({msg: err}))
    })
    .catch((err) => res.json({msg: err}))
}

const get_all = (req, res) => {
    
}




module.exports = {
    create_room,
    get_user_rooms,
    delete_room,
    get_rooms_messages,
    get_room
}

