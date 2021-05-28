const express = require('express');
const cors = require("cors");

const app = express();
require('./DBconnection')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const userRoute = require('./routes/UserRoute');
const organizationRoute = require('./routes/OrganizationRoute');
const employeeRoute = require('./routes/EmployeeRoute');


app.use('/user', userRoute);
app.use('/organization', organizationRoute);
app.use('/employee', employeeRoute);


app.use('*', (req, res) => {
  res.status(404).send("page not found!!!");
})

module.exports = app;