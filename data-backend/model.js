const mongoose = require("mongoose");

const establishConnection = (cb) => {
  mongoose
    .connect(
      "mongodb+srv://"
    )
    .then((res) => {
      console.log("Connection established");
      cb();
    });
};

const schema = mongoose.Schema;

const courseSchema = new schema({
  id: {
    type: Number,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  noOfLessons: {
    type: Number,
    require: true,
  },
  userAddress: {
    type: String,
    require: true,
  }
});

exports.connection = establishConnection;
exports.courseModel = mongoose.model("course", courseSchema);
