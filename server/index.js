const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);

const port = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("Mongodb connected!");
    app.listen(port, () => {
      console.log(`Server started at port ${port}`);
    });
  });
