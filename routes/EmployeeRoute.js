const router = require('express').Router();
const auth = require('../Auth/verifyLogin')

let { createEmployee, getEmployee } = require("../Services/Employee");


router.post("/create", auth, createEmployee);
router.get("/list/:id", auth, getEmployee);


module.exports = router;