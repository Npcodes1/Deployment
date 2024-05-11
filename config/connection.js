//require mongoose
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

//to check connection and check for errors
mongoose.connect(process.env.DB_URL).then(() => console.log("MongoDB is connected!")).catch((err) => console.log(err));
