const Organization = require('../model/Organization');
const validate = require('../validation/validation')

exports.createOrganization = async (req, res) => {
    if (req.body.orgName == undefined || req.body.address == undefined || req.body.gstNo == undefined ||
        req.body.panNo == undefined || req.body.email == undefined || req.body.mobileno == undefined
        || req.body.status == undefined)
        return res.status(400).send({ error: "All Filed is Required" })


    if (validate.lengthCheck(req.body.orgName, 5)) return res.status(400).send({ error: 'orgName length min 5 required!!!' })

    if (validate.lengthCheck(req.body.address, 5)) return res.status(400).send({ error: 'address length min 5 required!!!' })

    if (validate.lengthCheck(req.body.gstNo, 15)) return res.status(400).send({ error: 'gstNo length min 15 required!!!' })
    if (validate.lengthCheck(req.body.panNo, 10)) return res.status(400).send({ error: 'Pan no length min 10 required!!!' })

    if (!validate.emailCheck(req.body.email)) return res.status(400).send({ error: "Enter Correct Email Address!!!" })

    if (req.body.mobileno != undefined) {
        if (validate.NumberlengthCheck(req.body.mobileno, 10) || isNaN(req.body.mobileno)) return res.status(400).send({ error: 'Enter valid Mobile Number' })
    }

    const emailCheck = await Organization.findOne({ email: req.body.email, userId: req.user })
    if (emailCheck) return res.status(400).send({ error: 'Email id Alredy Exits!!!' })

    const mobilenoCheck = await Organization.findOne({ mobileno: req.body.mobileno, userId: req.user })
    if (mobilenoCheck) return res.status(400).send({ error: 'Mobileno Alredy Exits!!!' })

    const organization = new Organization({
        ...req.body,
        userId: req.user
    });

    try {
        const savedOrganization = await organization.save();
        res.status(201).send({ msg: "Organization Registration Sucessfully", savedOrganization });

    } catch (error) {
        res.status(400).send({ Msg: "Organization Registration failed!!", error })
    }
}


exports.getOrganization = async (req, res) => {

    try {
        await Organization.find({ userId: req.user }, (err, result) => {
            if (err) return res.status(400).send({ error: "Organization not found !!" })
            res.status(200).send(result)
        }).select({ "orgName": 1, "_id": 1 })

    } catch (error) {
        res.status(400).send({ Msg: "Organization found failed!!", error })
    }
}