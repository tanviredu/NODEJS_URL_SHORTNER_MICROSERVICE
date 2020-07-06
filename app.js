const express     = require("express");
const mongoose    = require("mongoose");
const bodyParser  = require("body-parser");
const morgan      = require("morgan");
const config      = require("./config");
const Url         = require("./models/Url");
const validUrl    = require("valid-url")
const shortId     = require("shortid"); 
const url         = config.mongoUrl;
const PORT        = 8000;
const urlshortner = require("./routes/urlshortner");
var app = express();
app.use(morgan('dev'));
// app.use(bodyParser.json());

app.use('/api',urlshortner);





const connect = mongoose.connect(url);
connect.then((db)=>{
    console.log("[*] Connecting to the database ... ");
    console.log("[*] connected to the database");
    console.log("[*] Starting the sever");
    app.listen(PORT,()=>{
        console.log("[*] Server Stated");

    })
})
