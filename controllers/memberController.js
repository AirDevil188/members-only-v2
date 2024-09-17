const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const dotenv = require("dotenv");
const db = require("../db/queries");

dotenv.config();
const validateMembership = [
  body("secret-password")
    .custom((value, {}) => {
      return value === process.env.SECRET;
    })
    .withMessage("Invalid secret password"),
];

const getMember = asyncHandler(async (req, res, next) => {
  if (res.locals.currentUser) {
    res.render("member", {
      title: "Membership",
    });
  } else {
    res.redirect("/");
  }
});

const postMember = [
  validateMembership,
  asyncHandler(async (req, res, next) => {
    console.log(res.locals.currentUser);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("member", {
        title: "Membership",
        errors: errors.array(),
      });
    }
    await db.becomeMember(res.locals.currentUser.id);
    res.redirect("/");
  }),
];

module.exports = {
  getMember,
  postMember,
};
