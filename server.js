require("dotenv").config();


const express = require("express");
const cors = require('cors');
const sequelize = require('./database');


const app  = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

const userRoute = require('./routes/userRoute');
app.use('/api/create-post', userRoute);

const port = process.env.PORT || 3000;

sequelize.sync()
.then(() =>{
    console.log("the database is connected successfully");
    app.listen(port, () => {
      console.log(`The port is running on ${port}`);
    });
})
.catch((err) =>{
    console.log("Error connecting to the database:", err);
})

