const zod = require("zod");

const updaterMiddleware = (req, res, next) => {
  const updateBody = zod.object({
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
    password: zod
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/, {
        message:
          "Password must include at least one number and one special character",
      })
      .optional(),
  });
  try {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        message: "Error while updating information",
      });
    }
    next();
  } catch (err) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }
};

module.exports = {
  updaterMiddleware,
};
