const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectedDB = require("./config/db");
const morgan = require('morgan');
const port = 3001;

//connexion a la base de données
connectedDB();

const app = express();

//midlleware pour mieux comprendre les request
app.use(cors({ 
    origin: true,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/api", require("./routes/postRoutes"));
app.use(morgan('combined'));
app.get('/', (req,res) => {
    res.send({
        msg: "c'est fait !"
    });
});
//lancer le server
app.listen(port, () => {
    console.log("connecté");
});