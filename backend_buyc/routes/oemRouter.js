const express = require("express");
const oemRouter = express.Router();
const { OemSpecsModel } = require("../models/oemSpecsModel");

// Route to search for OEM specs by model name and year
oemRouter.get("/specs", async (req, res) => {
  const { modelName, modelYear } = req.query;

  try {
    let specs;

    // If search query is provided, perform a case-insensitive regex search on the model name, year, and colors
    if (search) {
      specs = await OemSpecsModel.find({
        $or: [
          { modelName: { $regex: modelName, $options: "i" } },
          { modelYear: { $regex: modelYear, $options: "i" } },
        ],
      });
    } else {
      // If no search query is provided, fetch all specs
      specs = await OemSpecsModel.find({});
    }
    res.send(specs);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = { oemRouter };
