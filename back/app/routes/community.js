// Importing our express and router modules
const express = require("express");
const router = express.Router();

// importing our controllers and middlewares
const communityCtrl = require("../controllers/community");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config.js");

// We make our routes to create a community and to like a community
router.post("/", auth, multer, communityCtrl.createCommunity);
router.post("/:id/like", auth, communityCtrl.rateCommunity);
// We make our route to report a community (RGPD rules)
router.post("/report/:id", auth, communityCtrl.reportCommunity);

// We make our routes to get one or all the communitys
router.get("/:id", communityCtrl.readOneCommunity);
router.get("/", communityCtrl.readAllCommunities);

// We make our route to update a community
router.put("/:id", auth, multer, communityCtrl.updateCommunity);

// We make our route to delete a community
router.delete("/:id", auth, communityCtrl.deleteCommunity);

module.exports = router;
