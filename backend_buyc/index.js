const express = require("express");
const { dbConnection } = require("./configs/db.js");
require("dotenv").config();

const cors = require("cors");
const { userRouter } = require("./routes/userRouter.js");
const { inventoryRouter } = require("./routes/inventoryRouter.js");
const { oemRouter } = require("./routes/oemRouter.js");

const app = express();

app.use(cors()); //to avoid errors on frontend due to cross origin requests
app.use(express.json()); //to get the data from the fronted in json  parsed format

app.use("/users", userRouter);
app.use("/", inventoryRouter);
app.use("/oem", oemRouter);


app.listen(process.env.port, async () => {
  try {
    console.log(`Server is running at port ${process.env.port}`);
    await dbConnection;
    console.log("Successfully connected to database");
  } catch (error) {
    console.log(error);
  }
});
