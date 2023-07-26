const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    roomId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }, 
    text : {
        type: String,
        required: true
    }, 
}, {timestamps:true});


const Message = mongoose.model("message", messageSchema);
module.exports = Message