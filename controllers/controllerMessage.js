const Message = require("../models/modelMessage.js")
const Room = require("../models/modelRoom.js")
const User = require("../models/modelUser.js")



const get_all = (req, res) => {
    const id = req.params.id;
    Message.find({userId: id})
    .then((messages) => res.json({messages}))
    .catch((error) => res.status(400).json({error}))
}

const get_message = (req, res) => {    
    const id = req.params.messageId;
    Message.findById(id)
    .then((message) => res.json(message))
    .catch((error) => res.status(400).json({error}))
}

const post_message = (req, res) => {
    const id = req.params.id;
    const roomId = req.body.roomId;
    const text = req.body.text;

    if(roomId == undefined || text == undefined) {
        res.status(400).json({msg: "Fill all the required fields"})
    } else {
        Room.findById(roomId)
        .then( () => {
            new Message({
                roomId,
                userId: id,
                text: req.body.text
            }).save()
            .then(() => res.json({msg: "Message sent"}))
            .catch(() => res.status(400).json({msg: "Error occurred while trying to sent the message "}))       
        })    
        .catch(() => {
            res.status(404).json({msg: "Invalid room id"})
        })
    }
}

const put_message = (req, res) => {
    const id = req.params.id;
    const messageId = req.params.messageId;
    const text = req.body.text;
    Message.findById(messageId)
    .then((message) => {
        if(message.userId != id) {
            res.status(400).json({msg: "Invalid user id"})
        } else {
            if(text == undefined) {
                res.status(400).json({msg: "Fill all the required fields"})
            } else {
                Message.findByIdAndUpdate(messageId,  { '$set': {text} })
                .then(() => res.json({msg: "Message edited"}))
                .catch((msg) => res.status(400).json({msg: "Invalid message id"}))
            }
        }
    }).catch((msg) => res.status(400).json({msg: "Invalid message id"}))  
}

const delete_message = (req, res) => {
    const id = req.params.id;
    const messageId = req.params.messageId;
    Message.findById(messageId)
    .then((message) => {
        if(message.userId != id) {
            res.status(400).json({msg: "Invalid user id"})
        } else {
            Message.findByIdAndDelete(messageId)
            .then(() => res.json({msg: "Message deleted"}))
            .catch(() => res.status(400).json({msg: "Error occurred while trying to delete the message "}))             
        }
    }).catch(() => res.status(400).json({msg: "Invalid message id"}))  
}


module.exports = {
   post_message,
   put_message,
   delete_message
    
}
