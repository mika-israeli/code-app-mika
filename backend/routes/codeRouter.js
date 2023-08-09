const express = require("express");
const router = express.Router();
const codeBlocksModel = require("../models/CodeBlockModel");

router.get(`/:id`, async (req, res) => {
  const id = req.params.id;
  console.log("GET request", id);
  try {
    const result = await codeBlocksModel.findOne({ id: id });
    console.log("GET request for code block ", id);
    console.log("code ", result);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
});

module.exports = router;
