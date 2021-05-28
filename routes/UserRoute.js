const router = require('express').Router();

let { registration, login } = require("../Services/User");


router.post("/register", registration);
router.post("/login", login);


module.exports = router;