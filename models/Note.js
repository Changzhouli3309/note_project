const e = require("express");
const mongoose = require("mongoose");

const comment = {
    sender: String,
    content: String
}

const NoteSchema = mongoose.Schema({
    creatTime:{
        type: Date,
        require: true,
    },
    title: {
        type: String,
        required: true,
    },
    sender: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
    },
    voters: {
        type: [String],
    },
    comments: {
        type: [comment]
    }
});

module.exports = mongoose.model("Note", NoteSchema);
