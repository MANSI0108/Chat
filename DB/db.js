const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

async function dbConnection() {
    try {
        const Connection = await mongoose.connect(process.env.DB_URI)
        console.log("DB Connected :", Connection.connection.host, "=>", Connection.connection.name);
    }
    catch (err) {

        console.error(err);

    }
}

module.exports = dbConnection;