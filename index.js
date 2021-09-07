const express = require("express");
app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cookieParser());
app.use(express.json());
app.use(cors());

//mongodb+srv://test_user1:RNJz0sZwN7frCz02@note-project-database.l7kb8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/new-note-project-db",
  { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true },
  () => {
    console.log("mongodb is connected");
  }
);

const userRouter = require("./routes/User");
app.use("/user", userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
