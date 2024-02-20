const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User, Account } = require("../models/userdb.js");
const { jwtSecret } = require("../config/appConfig.js");

const signup = async (req, res) => {
  const checkExisting = await User.findOne({ username: req.body.username });
  if (checkExisting) {
    return res.status(411).json({
      message: "Email already taken",
    });
  }

  const newUser = new User({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });

  const hashedPassword = await newUser.createHash(req.body.password);
  newUser.password_hash = hashedPassword;
  const userId = newUser._id;
  await newUser.save();
  const token = jwt.sign({ userId }, jwtSecret);
  await Account.create({
    userId,
    balance: 0,
  });

  res.json({
    message: "User created successfully", 
    token
  });
};

const signin = async (req, res) => {
  const currUser = await User.findOne({ username: req.body.username });
  if (currUser && (await currUser.validatePassword(req.body.password))) {
    const userId = currUser._id;
    const token = jwt.sign({ userId }, jwtSecret);
    return res.json({ token });
  }

  res.status(404).json({ message: "Invalid credentials" });
};

const updateDetails = async (req, res) => {
  try {
    const currUser = await User.findById(req.userId);
    currUser.firstname = req.body.firstname || currUser.firstname;
    currUser.lastname = req.body.lastname || currUser.lastname;

    if (req.body.password) {
      currUser.password_hash = await currUser.createHash(req.body.password);
    }
    await currUser.save();

    res.json({ message: "Updated successfully" });
  } catch (err) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }
};

const searchFn = async (req, res) => {
  const filter = req.query.filter || "";

  if (filter === "") {
    res.json({ user: [] });
  }
  const users = await User.find({
    username: {
      $regex: filter,
    },
  });
  const user = users.map((user) => ({
      username: user.username,
      firstName: user.firstname,
      lastName: user.lastname,
      _id: user._id,
    }))
  res.json({user});
};

module.exports = {
  signup,
  signin,
  updateDetails,
  searchFn,
};
