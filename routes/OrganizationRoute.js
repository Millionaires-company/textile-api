const router = require('express').Router();
const auth = require('../Auth/verifyLogin')

let { createOrganization, getOrganization } = require("../Services/Organization");


router.post("/create", auth, createOrganization);
router.get("/list", auth, getOrganization);


module.exports = router;