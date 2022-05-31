// Importing our express and router module
const express = require("express");
const router = express.Router();

// Importing our controllers and middlewares
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// We make our routes to signup or logging an user
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
// // we make our route to report an user
// router.post("/report/:id", auth, userCtrl.reportUser);

// // we make our routes to read and export an user data (RGPD rules)
 router.get("/read", auth, userCtrl.readUser);
 router.get("/export", auth, userCtrl.exportUser);
 
// // we make our route tu update user's info
 router.put("/", auth, multer, userCtrl.updateUser);

// // We make our route to delete an user
 router.delete("/", auth, userCtrl.deleteUser);

// we export our router
module.exports = router;
