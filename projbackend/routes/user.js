const express = require('express');
const router = express.Router();

const { isAuthenticated, isSignedIn, isAdmin} = require("../controllers/auth");
const {getUserById, getUser, updateUser,userPurchaseList } = require("../controllers/user");   //getAllUser


router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
// router.get("/users", getAllUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.get("/orders/user/:userId", isSignedIn, isAuthenticated, userPurchaseList);
module.exports = router;