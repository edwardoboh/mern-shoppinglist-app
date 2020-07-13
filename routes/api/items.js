const express = require("express");
const router = express.Router();
const Item = require("../../Model/ItemModel");

const auth = require("./middleware/verify");

// Request to Get all Items
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((item) => {
      res.json(item);
    });
});

// Request to Add a new Item
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  newItem.save().then((Item) => {
    res.json(Item);
  });
});

// Request to delete an Item
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    // .remove()
    .deleteOne()
    .then(() => {
      res.status(200).json({ msg: "Delete Success" });
    });
});

module.exports = router;
