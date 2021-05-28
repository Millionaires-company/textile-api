let port = process.env.PORT || 8000;
let app = require('./app');

app.listen(port, () => {
    console.log(`server listening at ${port}`)
})