const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const dotenv = require("dotenv");
const db = require("../db/queries");

dotenv.config();

const validateAdmin = [
  body("secret-password")
    .custom((value) => {
      return value === process.env.ADMIN;
    })
    .withMessage("Invalid secret password"),
];

const getAdmin = asyncHandler(async (req, res, next) => {
  if (res.locals.currentUser) {
    res.render("admin", {
      title: "Admin",
    });
  } else {
    res.redirect("/");
  }
});

const postAdmin = [
  validateAdmin,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("admin", {
        title: "Admin",
      });
    }
    await db.becomeAdmin(res.locals.currentUser.id);
    res.redirect("/");
  }),
];

module.exports = {
  getAdmin,
  postAdmin,
};
