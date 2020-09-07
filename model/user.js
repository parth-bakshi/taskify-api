const mongoose = require("mongoose");
const validator = require("validator");

// User Schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (validator.isEmail(value)) {
          throw new Error("Enter a valid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password can't contain password");
        }
      },
    },
    name: {
      type: String,
      required: true,
      trim:true
    },
    tokens: [
      {
        token: {
          type: string,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// virtual field to get tasks
userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    forignField: 'owner'
})


// Setting up User model
const User = mongoose.model("User", userSchema);

// Exporting Model
module.exports = User;
