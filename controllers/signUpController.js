const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const { validationResult, body } = require("express-validator");

const lengthErr = "must contain at least one character";

const validateUser = [
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage(`First Name ${lengthErr}`),
  body("last_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage(`Last Name ${lengthErr}`),
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage(`Username ${lengthErr}`),
  body("password")
    .trim()
    .isLength({ min: 1 })
    .withMessage(`Password ${lengthErr}`),
  body("confirm-password")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Password doesn't match."),
];

const getSignUp = asyncHandler(async (req, res, next) => {
  res.render("sign-up", {
    title: "Sign Up",
  });
});

const postSignUp = [
  validateUser,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("sign-up", {
        title: "Sign Up",
        errors: errors.array(),
      });
    }
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      try {
        if (err) {
          return next(err);
        }
        await db.createNewUser(
          req.body.first_name,
          req.body.last_name,
          req.body.username,
          hashedPassword
        );
        res.redirect("/");
      } catch (err) {
        return next(err);
      }
    });
  }),
];

module.exports = {
  getSignUp,
  postSignUp,
};
