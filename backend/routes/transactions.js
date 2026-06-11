const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
router.post("/", async (req, res) => {
  const transaction =
    await Transaction.create(req.body);

  res.json(transaction);
});
router.get("/", async (req, res) => {
  const transactions =
    await Transaction.find();

  res.json(transactions);
});
router.delete("/:id", async (req, res) => {
  await Transaction.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message: "Deleted"
  });
});
module.exports = router;