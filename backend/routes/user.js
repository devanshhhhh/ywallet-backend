const express = require("express"); 
const userContoller = require("../contollers/userController.js");
const {
  signupMiddleware,
  signinMiddleware,
} = require("../middlewares/userMdw.js");
const { authMiddleware } = require("../middlewares/authMdw.js");
const { updaterMiddleware } = require("../middlewares/updaterMdw.js");

const router = express.Router();

router.post("/signup", signupMiddleware, async (req, res) => {
  await userContoller.signup(req, res);
});

router.post("/signin", signinMiddleware, async (req, res) => {
  await userContoller.signin(req, res);
});

router.put("/update", authMiddleware, updaterMiddleware, async (req, res) => {
  await userContoller.updateDetails(req, res);
});

router.get("/search", authMiddleware, async (req, res) => {
  await userContoller.searchFn(req, res);
});

module.exports = router;
