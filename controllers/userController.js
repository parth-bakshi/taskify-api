const User = require("../model/user");

// create user
module.exports.create = async (req, res) => {
  try {
    console.log(req.body);
    const user = await new User({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    });
    const token = await user.generateAuthToken();

    await user.save();
    return res.status(201).send({ user, token });
  } catch (e) {
    console.log("Error in Create API: ", e);
    if ((e.code = 11000)) {
      return res
        .status(400)
        .send({ message: "Unable to create user due to wrong data" });
    }
  }
};

// login
module.exports.login = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    return res.send({ user, token });
  } catch (e) {
    console.log("Error In Login API: ", e);
    return res.status(400).send({ message: "Unable to Login" });
  }
};

// logout
module.exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    await req.user.save();
    return res.send({ message: "Logged Out Successfully" });
  } catch (e) {
    res.status(500).send(e);
  }
};

// get user's data
module.exports.userData = async (req, res) => {
  try {
    return res.send({ user: req.user });
  } catch (e) {
    console.log("User Data API: ", e);
    return res.status(500).send({ message: "Unable to fetch" });
  }
};

// create category
module.exports.createCategory = async (req, res) => {
  try {
    if (req.user.categories.includes(req.body.category)) {
      return res.status(409).send({ message: "Category already exists" });
    }
    let categories = [...req.user.categories, req.body.category];
    await req.user.update({ categories });
    await req.user.save();
    return res.send({
      message: "Category Updated",
      categories,
    });
  } catch (e) {
    console.log("Create Category API: ", e);
    return res.status(500).send({ message: "Unable to Create Category" });
  }
};

// return all categories
module.exports.getCategory = async (req, res) => {
  try {
    let categories = await User.findById(req.user._id);
    return res.send({
      message: "all categories",
      data: categories.categories,
    });
  } catch (e) {
    console.log("return all Category API: ", e);
    return res.status(500).send({ message: "Unable to return Categories" });
  }
};

// delete category
module.exports.deleteCategory = async (req, res) => {
  try {
    const delCategory = req.body.category;

    if (!req.user.categories.includes(delCategory)) {
      return res.status(400).send({ message: "category not available" });
    }
    categories = await req.user.categories.filter((category) => {
      return category !== delCategory;
    });
    console.log(categories);
    await req.user.update({ categories });
    await req.user.save();
    res.send({
      message: "Category Updated",
      categories,
    });
  } catch (e) {
    console.log("Delete Task API: ", e);
    return res.status(500).send({ message: "Unable to delete" });
  }
};
