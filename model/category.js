const mongoose = require("mongoose");
const db = require("../config/mongoose");
const categorySchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
      unique: true,
    },
    tasks:[
        {
            type:mongoose.Schema.Types.ObjectId
        }
    ]
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
