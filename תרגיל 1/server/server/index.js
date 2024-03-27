import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import http from 'http';
import jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import patientRouter from './Routes/patientRouter.js'
import covid19DetailsRouter from './Routes/covid19DetailsRouter.js'
import staff from './Routes/staff.js'
import isIsraeliIdValid from 'israeli-id-validator';

import("./db/mongoConnect.js")
const app = express(); //מופע מסוג הקספרסס
const port = 3001;

var corsOptions = {
  origin: "*"
};
app.use(express.json());

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));  


app.get('/', (req, res) => {
  res.send('Hello World!')
})

//routing
app.use("/patient", patientRouter)
app.use("/covid19Details", covid19DetailsRouter)
app.use("/staff", staff)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })