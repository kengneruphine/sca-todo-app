import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DB = process.env.DB_URL;

module.exports = function () {
    mongoose.connect(DB,{ useNewUrlParser: true })
    .then(() => {
        console.log('Successful connected to MongoDB ATLAS');
    })
    .catch((error) => {
        console.log("Unable to connect to MongoDB ATLAS");
        console.error(error);
   })
}
