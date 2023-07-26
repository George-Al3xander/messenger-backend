const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    participants: {
        type: Object,
        required: true
    },   
}, {timestamps:true});


const Room = mongoose.model("room", roomSchema);
module.exports = Room