const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./model").connection;
const courseModel = require("./model").courseModel;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.post("/courseUpload", (req, res, next) => {
  try {
    const { id, title, description, noOfLessons, price, userAddress } =
      req.body;
    console.log(id);
    const newModel = new courseModel({
      id,
      title,
      description,
      noOfLessons,
      price,
      userAddress,
    });
    newModel.save().then((response) => {
      console.log(response);
      res.status(200).send("success");
    });
  } catch (e) {
    console.log(e);
  }
});

app.get("/getCourse/:title", (req, res, next) => {
  try {
    const title = req.params.title;
    courseModel.find({ title }).then((response) => {
      res.status(200).send(response);
    });
  } catch (e) {
    console.log(e);
  }
});

app.get("/allCourses", (req, res, next) => {
  try {
    courseModel.find({}).then((response) => {
      res.status(200).send(response);
    });
  } catch (e) {
    console.log(e);
  }
});

app.get("/coursesByuserAddress/:address", (req, res, next) => {
  try {
    const address = req.params.address;
    courseModel.find({ userAddress: address }).then((response) => {
      res.status(200).send(response);
    });
  } catch (e) {
    console.log(e);
  }
});

app.get("/getCourseById/:id", (req, res, next) => {
  try {
    const id = req.params.id;
    courseModel.find({ id }).then((response) => {
      res.status(200).send(response);
    });
  } catch (e) {
    console.log(e);
  }
});

app.listen(5500, () => {
  try {
    connection(() => {
      console.log("Server listening on port 5500");
    });
  } catch (e) {
    console.log(e);
  }
});
