const express = require("express");
const { InventoryModel } = require("../models/inventoryModel");
const { OemSpecsModel } = require("../models/oemSpecsModel");
const {
  authenticationMiddleware,
} = require("../middlewares/authenticationMiddleware");




const inventoryRouter = express.Router();

inventoryRouter.use(authenticationMiddleware);
inventoryRouter.get("/inventory", (req, res) => {
  res.send("Welcome to inventory");
});
inventoryRouter.post("/inventory", async (req, res) => {
  console.log("logged", req.logged_id);
  try {
    let {
      pictures,
      price,
      title,
      description,
      kms,
      majorScratches,
      orginalPaint,
      prevBuyers,
      registrationPlace,
      accidents,
    } = req.body;
    let newCar = {
      pictures,
      price,
      title,
      description,
      kms,
      majorScratches,
      orginalPaint,
      prevBuyers,
      registrationPlace,
      accidents,
      userId: req.logged_id,
    };
    let newInventory = InventoryModel(newCar);
    await newInventory.save();
    res.status(200).send({ msg: "New Car Added Successsfully in Inventory" });
  } catch (error) {
    res.send({ error });
  }
});

//to fetch particular inventory by it's id
inventoryRouter.get("/inventory/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let searchByIdInventory = await InventoryModel.findById(id);
    res
      .status(200)
      .send({ msg: "The car you searched found by id", searchByIdInventory });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

// applying filters on inventory based on color , price and mileage ,
//these will work independently as well as in combination with each other
inventoryRouter.get("/inventory", async (req, res) => {
  try {
    let query = {}; // Initialize an empty query

    if (req.query.minPrice && req.query.maxPrice) {
      query.price = {
        $gte: +req.query.minPrice,
        $lte: +req.query.maxPrice,
      };
    }

    if (req.query.color) {
      query.color = req.query.color;
    }

    if (req.query.minMileage && req.query.maxMileage) {
      query.mileage = {
        $gte: +req.query.minMileage,
        $lte: +req.query.maxMileage,
      };
    }

    const cars = await InventoryModel.find(query);

    res.status(200).send({ cars });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// particular inventory route to update the details

inventoryRouter.patch("/inventory/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const userId = req.logged_id;
    const payload = req.body;

    const inventory = await InventoryModel.findById(id);
    console.log(inventory, "here");

    const inventoryCretorId = inventory.userId.toString();

    console.log(
      "id",
      id,
      "userId",
      userId,
      "inventorycreatorId",
      inventoryCretorId
    );

    if (inventoryCretorId !== userId) {
      res.status(400).send({
        msg: "Not authorized for updating art",
      });
      return;
    }

    let updatedInventory = await InventoryModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res
      .status(200)
      .send({ msg: "Updated Car Details Successfully", updatedInventory });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

// particular inventory route to delete the inventory

inventoryRouter.delete("/inventory/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const userId = req.logged_id;
    const payload = req.body;

    const inventory = await InventoryModel.findById(id);

    const inventoryCretorId = inventory.userId.toString();

    console.log(
      "id",
      id,
      "userId",
      userId,
      "inventorycreatorId",
      inventoryCretorId
    );

    if (inventoryCretorId !== userId) {
      res.status(400).send({
        msg: "Not authorized for updating art",
      });
      return;
    }

    let deletedInventory = await InventoryModel.findByIdAndDelete(id, req.body);
    res
      .status(200)
      .send({ msg: "Deleted Car Details Successfully", deletedInventory });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

module.exports = { inventoryRouter };
