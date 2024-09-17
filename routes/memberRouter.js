const { Router } = require("express");

const memberRouter = Router();

const memberController = require("../controllers/memberController");

memberRouter.get("/", memberController.getMember);

memberRouter.post("/", memberController.postMember);

module.exports = memberRouter;
