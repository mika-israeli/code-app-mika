const mongoose = require("mongoose");

const Scheme = mongoose.Schema;

const codeBlocks = new Scheme({
  id: { type: String, required: true },
  title: { type: String, required: true },
  testCode: { type: String, required: true },
  correctedCode: { type: String, required: true },
});

const CodeBlocks = mongoose.model("CodeBlocks", codeBlocks);
module.exports = CodeBlocks;
