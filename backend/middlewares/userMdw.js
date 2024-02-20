const {
  checkUsername,
  checkFirstname,
  checkLastname,
  checkPassword,
} = require("./checkers.js");

const signupMiddleware = (req, res, next) => {
  const username = req.body.username;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const password = req.body.password;
  try {
    const resUsername = checkUsername.safeParse(username);
    const resFirstname = checkFirstname.safeParse(firstname);
    const resLastname = checkLastname.safeParse(lastname);
    const resPassword = checkPassword.safeParse(password);

    if (!resUsername.success) {
      return res.status(411).json({
        message: "Invalid email",
      });
    } else if (!resFirstname.success || !resLastname.success) {
      return res.status(411).json({
        message: "Frist name and Last name must be a string",
      });
    } else if (!resPassword.success) {
      return res.status(411).json({
        message:
          "Passowrd must be at-least 8 characters long, having at-least one speical character (@, $, !, %, *, #, ?, &) and at-least one numerical character",
      });
    }
    next();
  } catch (error) {
    return res.status(404).json({ message: "Something went wrong" });
  }
};

const signinMiddleware = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const resUsername = checkUsername.safeParse(username);
    const resPassword = checkPassword.safeParse(password);

    if (!resUsername.success || !resPassword.success) {
      return res.status(411).json({
        message: "Invalid credentials",
      });
    }
    next();
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

module.exports = {
  signupMiddleware,
  signinMiddleware,
};
