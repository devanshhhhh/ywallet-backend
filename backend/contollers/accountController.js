const { Account, User } = require("../models/userdb.js");
const mongoose = require("mongoose");

const getBalance = async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  res.json({
    balance: account.balance,
  });
};

const addBalance = async (req, res) => {
  const currSession = await mongoose.startSession();

  currSession.startTransaction();
  const { amount } = req.body;

  const account = await Account.findOne({ userId: req.userId }).session(
    currSession
  );

  if (!account) {
    await currSession.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: amount } }
  ).session(currSession);
  await currSession.commitTransaction();

  res.json({
    message: "Added balance successfully",
  });
};

const transferMoney = async (req, res) => {
  const currSession = await mongoose.startSession();

  currSession.startTransaction();
  const { amount, to } = req.body;

  const account = await Account.findOne({ userId: req.userId }).session(
    currSession
  );

  if (!account || account.balance < amount) {
    await currSession.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }
  const toUser = await User.findOne({ username: to }).session(currSession);
  const toAccount = await Account.findOne({ userId: toUser._id }).session(
    currSession
  );

  if (!toAccount) {
    await currSession.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(currSession);
  await Account.updateOne(
    { userId: toUser._id },
    { $inc: { balance: amount } }
  ).session(currSession);

  await currSession.commitTransaction();

  res.json({
    message: "Transfer successful",
  });
};

module.exports = {
  getBalance,
  addBalance,
  transferMoney,
};
