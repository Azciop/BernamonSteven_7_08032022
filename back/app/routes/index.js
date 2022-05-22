const express = require("express");
const router = express.Router();

const userRoutes = require("./user");
// const communityRoutes = require("./community")
// const postRoutes = require("./post");

router.use("/auth", userRoutes);
// router.use("/community", communityRoutes);
// router.use("/posts", postRoutes);

module.exports = router;