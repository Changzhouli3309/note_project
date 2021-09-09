const e = require("express");
const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
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
});

module.exports = mongoose.model("Note", NoteSchema);
