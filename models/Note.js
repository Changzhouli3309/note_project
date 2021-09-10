const e = require("express");
const mongoose = require("mongoose");

const comment = {
    sender: String,
    content: String
}

const tagsX = {
    fun: Boolean,
    meta: Boolean,
    urgent: Boolean
}

const votersR = {
    voterName: String
}

const NoteSchema = mongoose.Schema({    
    date:{
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    tags: {
        type: tagsX,
    },
    upvote: {
        type: Number
    },
    replayss: {
        type: [comment]
    },   
    replays: {
        type: Number
    },
    theme: {
        type: Number        
    },
    voters: {
        type: [String],
    }
});

module.exports = mongoose.model("Note", NoteSchema);
