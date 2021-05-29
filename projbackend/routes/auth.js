var express = require("express");
var router = express.Router();
const { check, validationResult } = require('express-validator');

const {signup, signout, signin, isSignedIn } = require("../controllers/auth");

router.post(
    "/signup",
    [
    check("name", "at least 3 characters long").isLength({min : 3}),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 5 characters").isLength({min: 5})
    ],
signup);

router.post(
    "/signin",
    [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({min: 5})
    ],
signin);

router.get("/signout", signout);

//protected routes // authrisation and bearer then token
router.get("/testroute", isSignedIn , (req, res) => {
    // res.send("A protected route");
    res.json(req.auth);
});



module.exports = router;