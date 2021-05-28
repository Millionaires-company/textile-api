const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validate = require('../validation/validation')

exports.registration = async (req, res) => {
    if (req.body.email == undefined || req.body.fullName == undefined || req.body.password == undefined || req.body.mobileno == undefined)
        return res.status(400).send({ error: "All Filed is Required" })

    if (!validate.emailCheck(req.body.email)) return res.status(400).send({ error: "Enter Correct Email Address!!!" })

    if (validate.lengthCheck(req.body.password, 6)) return res.status(400).send({ error: 'password length min 6 required!!!' })

    if (validate.lengthCheck(req.body.fullName, 5)) return res.status(400).send({ error: 'fullName length min 5 required!!!' })

    if (req.body.mobileno != undefined) {
        if (validate.NumberlengthCheck(req.body.mobileno, 10) || isNaN(req.body.mobileno)) return res.status(400).send({ error: 'Enter valid Mobile Number' })
    }

    const emailCheck = await User.findOne({ email: req.body.email })
    if (emailCheck) return res.status(400).send({ error: 'Email id Alredy Exits!!!' })

    const mobilenoCheck = await User.findOne({ mobileno: req.body.mobileno })
    if (mobilenoCheck) return res.status(400).send({ error: 'Mobileno Alredy Exits!!!' })


    const salt = await bcrypt.genSalt(10);
    const user = new User({
        ...req.body,
        password: await bcrypt.hash(req.body.password, salt)
    });

    try {
        const savedUser = await user.save();
        const token = await jwt.sign({ _id: savedUser._id }, process.env.SECRET)

        res.header('auth-token', token).status(201).send({ msg: "Registration Sucessfully", userToken: token, savedUser });

    } catch (error) {
        res.status(400).send({ Msg: "Registration Failed!!!", error })
    }
}

exports.login = async (req, res) => {

    if (req.body.password == undefined || (req.body.mobileno == undefined && req.body.email == undefined))
        return res.send({ error: "All Filed is Required" })

    const email = req.body.email,
        mobileno = req.body.mobileno

    const conditions = !!email ? { email } : { mobileno };

    let user = {}
    if (conditions.email) {

        if (!validate.emailCheck(req.body.email)) return res.status(400).send({ error: "Enter Correct Email Address!!!" })
        user = await User.findOne({ email: req.body.email })
        if (!user) return res.send({ error: "Email Or Password not match!!!" })
    }

    if (conditions.mobileno) {

        if (validate.NumberlengthCheck(req.body.mobileno, 10) || isNaN(req.body.mobileno)) return res.status(400).send({ error: 'Enter valid Mobile Number' })
        user = await User.findOne({ mobileno: req.body.mobileno })
        if (!user) return res.send({ error: "Mobile no Or Password not match!!!" })
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.send({ error: `${conditions && conditions.email ? 'Email' : 'mobile no'} or Password not match` })

    try {
        const token = await jwt.sign({ _id: user._id }, process.env.SECRET)

        res.header('auth-token', token).status(201).send({ msg: "Login Sucessfully", userToken: token });

    } catch (error) {
        res.status(400).send({ Msg: "Login Failed!!!", error })
    }

}

