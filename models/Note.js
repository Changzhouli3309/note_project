const e = require("express");
const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    sender: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
    voter: {
        type: [String],
    },
});

module.exports = mongoose.model("Note", NoteSchema);
