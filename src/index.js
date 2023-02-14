const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const cors = require("cors");
const Router = require("./router/router");
// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Router);
mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://Chanchal25-DB:ZHrSPQhp8HuOM2Yy@cluster0.ypi01as.mongodb.net/contactManagement",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: ", error);
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
