const mongoose = require('mongoose');
const url = process.env.MONGO || "mongodb+srv://group4559:Company@521@cluster0.lduiv.mongodb.net/test";
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false

}, (err) => {
    if (!err) {
        console.log("DB Conneted Succefully!!!");
    }
    else {
        console.log(err);
    }
});