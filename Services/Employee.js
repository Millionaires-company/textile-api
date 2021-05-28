const Employee = require('../model/Employee');
const Organization = require('../model/Organization');

const validate = require('../validation/validation')

exports.createEmployee = async (req, res) => {
    if (req.body.emplName == undefined || req.body.orgId == undefined || req.body.salaryType == undefined ||
        req.body.role == undefined || req.body.email == undefined || req.body.mobileno == undefined
        || req.body.status == undefined)
        return res.status(400).send({ error: "All Filed is Required" })


    if (validate.lengthCheck(req.body.emplName, 5)) return res.status(400).send({ error: 'Employee Name length min 5 required!!!' })

    if (validate.lengthCheck(req.body.salaryType, 2)) return res.status(400).send({ error: 'Salary Type length min 2 required!!!' })

    if (validate.lengthCheck(req.body.role, 3)) return res.status(400).send({ error: 'role length min 3 required!!!' })
    if (validate.lengthCheck(req.body.status, 3)) return res.status(400).send({ error: 'status length min 3 required!!!' })

    if (!validate.emailCheck(req.body.email)) return res.status(400).send({ error: "Enter Correct Email Address!!!" })

    if (req.body.mobileno != undefined) {
        if (validate.NumberlengthCheck(req.body.mobileno, 10) || isNaN(req.body.mobileno)) return res.status(400).send({ error: 'Enter valid Mobile Number' })
    }

    const emailCheck = await Employee.findOne({ email: req.body.email, userId: req.user, orgId: req.body.orgId })
    if (emailCheck) return res.status(400).send({ error: 'Email id Alredy Exits!!!' })

    const mobilenoCheck = await Employee.findOne({ mobileno: req.body.mobileno, userId: req.user, orgId: req.body.orgId })
    if (mobilenoCheck) return res.status(400).send({ error: 'Mobileno Alredy Exits!!!' })

    const organizationCheck = await Organization.findOne({ userId: req.user, _id: req.body.orgId })
    if (!organizationCheck) return res.status(400).send({ error: 'organization not found' })

    const employee = new Employee({
        ...req.body,
        userId: req.user,
        orgId: req.body.orgId
    });

    try {
        const savedEmployee = await employee.save();
        res.status(201).send({ msg: "employee Registration Sucessfully", savedEmployee });

    } catch (error) {
        res.status(400).send({ Msg: "employee Registration failed!!", error })
    }
}



exports.getEmployee = async (req, res) => {

    try {
        await Employee.find({ userId: req.user, orgId: req.params.id }, (err, result) => {
            if (err) return res.status(400).send({ error: "Employee not found !!" })
            res.status(200).send(result)
        })

    } catch (error) {
        res.status(400).send({ Msg: "Employee found failed!!", error })
    }
}