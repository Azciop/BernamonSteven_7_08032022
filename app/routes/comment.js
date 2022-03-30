const express = require("express");
const router = express.Router();

// Importing our controllers and middlewares
const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");

// We make our routes to create and like a comment
router.post("/", commentCtrl.createComment);
router.post("/:id/like", auth, commentCtrl.rateComment);
// we make our route to report an user
router.post("/report/:id", auth, commentCtrl.reportComment);

// We make our routes to get all the comments
router.get("/", communityCtrl.readAllComments);

// We make our route to delete a comment
router.delete("/", auth, commentCtrl.deleteComment);

// we export our router
module.exports = router;
