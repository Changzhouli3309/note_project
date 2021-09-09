const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Note = require("../models/Note");

//Function to create our json webtoken
const signToken = (userId) => {
  return jwt.sign(
    {
      iss: "tester",
      sub: userId,
    },
    "justatset",
    {
      expiresIn: 60 * 60 * 24,
    }
  );
};

//-----------REGISTRATION, AUTHENTICATION, AUTHORIZATION-------------------//

//Save new user to db
userRouter.post("/register", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) {
      res
        .status(500)
        .json({ message: { msgBody: "An error occured", msgError: true } });
    }
    if (user) {
      res.status(400).json({
        message: { msgBody: "Username allready taken", msgError: true },
      });
    } else {
      const newUser = new User({ username, password });
      newUser.save((err) => {
        if (err) {
          res
            .status(500)
            .json({ message: { msgBody: "An error occured", msgError: true } });
        } else {
          res.status(200).json({
            message: {
              msgBody: "Account successfully created",
              msgError: false,
            },
          });
        }
      });
    }
  });
});

userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username } = req.user;
      const token = signToken(_id);
      res.cookie("access-token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({
        isAuthenticated: true,
        user: { _id, username },
        message: { msgBody: "Successfully logged in", megError: false },
      });
    }
  }
);

userRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { _id, username } = req.user;
    res.status(200).json({
      isAuthenticated: true,
      user: { _id, username },
    });
  }
);

userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access-token");
    res.status(200).json({
      user: { username: "" },
      message: { msgBody: "User has been logged out" },
      success: true,
    });
  }
);

//-----------Notes-------------------//

//add
userRouter.post(
  "/newnote",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const note = new Note({
      creatTime: req.body.creatTime,
      title: req.body.title,
      sender: req.body.sender,
      content: req.body.content,
      tags: req.body.tags,
      voters: req.body.voters,
      comments: req.body.comments,
    });
    note.save((err) => {
      if (err) {
        res.status(500).json({
          message: { msgBody: "An error occured", msgError: true },
        });
      } else {
        res.status(200).json({
          message: {
            msgBody: "Successfully added note",
            msgError: false,
          },
          isAuthenticated: true,
        });
      }
    });
  }
);

//get all
userRouter.get(
  "/getnotes",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Note.find({}, (err, notes) => {
      if (err) {
        res.status(500).json({
          message: { msgBody: "An error occured", msgError: true },
        });
      } else {
        res
          .status(200)
          .json(notes);
      }
    });
  }
);

//Update post route
userRouter.put("/updatenote/:id", (req, res) => {
  const note = new Note({
    creatTime: req.body.creatTime,
    title: req.body.title,
    sender: req.body.sender,
    content: req.body.content,
    tags: req.body.tags,
    voters: req.body.voters,
    comments: req.body.comments,
  });
  const _id = req.params.id;
  note.findByIdAndUpdate(_id, { title, content }, (err) => {
    if (err) {
      res.status(500).json({ message: "An error occured updating" });
    } else {
      res.status(200).json({ message: "Post was successfully updated!" });
    }
  });
});

//Delete post route
userRouter.delete("/deletenote/:id", (req, res) => {
  const _id = req.params.id;
  Note.findByIdAndDelete(_id, (err) => {
    if (err) {
      res.status(500).json({ message: "An error occured deleting" });
    } else {
      res.status(200).json({ message: "Post was successfully deleted!" });
    }
  });
});

module.exports = userRouter;
