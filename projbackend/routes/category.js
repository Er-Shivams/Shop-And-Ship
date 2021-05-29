const express = require("express");
const router = express("express");

const {getCategoryById, createCategory, getCategory , getAllCategory, updateCategory, removeCategory}  = require("../controllers/category");
const {isAdmin, isAuthenticated, isSignedIn}  = require("../controllers/auth");
const {getUserById}  = require("../controllers/user");



//param or parameter
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);


//actual routes
//create route
router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory);


//read routes

router.get("/category/:categoryId", getCategory);
//error updation in frontend ---> all categories not showingin select option -> error is "categories" -> "/categories"
router.get("/categories", getAllCategory);

//update route
router.put("/category/:categoryId/:userId",isSignedIn, isAuthenticated, isAdmin, updateCategory)


//delete route

router.delete("/category/:categoryId/:userId",isSignedIn, isAuthenticated, isAdmin, removeCategory)







module.exports = router; 