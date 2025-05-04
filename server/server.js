const express = require('express');
const app = express();
require('dotenv').config();
const dbconfig = require('./config/dbconfig');
app.use(express.json());

const userRoute = require("./routes/usersRoute");
const moviesRoute = require("./routes/moviesRoute");
const theatreRoute = require("./routes/theatresRoute");
const bookingsRoute = require("./routes/bookingsRoute");

app.use('/api/users', userRoute);
app.use('/api/movies', moviesRoute);
app.use('/api/theatres', theatreRoute);
app.use('/api/bookings', bookingsRoute)

const port = process.env.PORT || 5000;

const path = require("path");
__dirname = path.resolve();
//render deployment
if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/client/build")))
    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });

}


app.listen(port, () => console.log(`Node JS Server is running on port ${port}`));