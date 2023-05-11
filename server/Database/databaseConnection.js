const mongoose = require('mongoose');

const DBConnection = process.env.DATABASE;
mongoose.connect(DBConnection, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Databse is connected!');
}).catch(() => {
    console.log('Database is not connected!');
});