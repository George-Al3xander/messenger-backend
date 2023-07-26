const Message = require("../models/modelMessage.js")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")


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
    .catch((err) => res.status(400).json({error}))
}


module.exports = {
    index,
    get_all,
    
}
