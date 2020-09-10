const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase:true,
      validate(value) {
        if (!validator.isEmail(value)) {
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
      trim: true,
    },
    categories:{
      type:Array,
      // required:true,
      default : ['Personal','Shopping',"Work"]
    },
    tokens:[{
      token:{
          type: String,
          required: true
      }
  }],
  },
  {
    timestamps: true,
  }
);

// virtual field to get tasks
userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

// deleting password from response
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.token
  return user;
};

// finding user
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable To Login");
  }
  const isMatch = await bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    throw new Error("Unable To Login");
  }
  return user;
};

// generating auth token (jwt)
userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
  if(this.tokens.length > 4){
    this.tokens.shift()
  }
  this.tokens = this.tokens.concat({ token });
  await this.save()
  return token;
};


// hashing password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});

// Setting up User model
const User = mongoose.model("User", userSchema);

// Exporting Model
module.exports = User;
