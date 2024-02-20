const zod = require("zod");

const checkUsername = zod.string().email();
const checkFirstname = zod.string();
const checkLastname = zod.string();
const checkPassword = zod
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/, {
    message:
      "Password must include at least one number and one special character",
  });

module.exports = {
  checkUsername,
  checkFirstname,
  checkLastname,
  checkPassword,
};
