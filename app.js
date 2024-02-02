const express = require('express');
const { connect, close, client } = require('./db');
const cors = require('cors');

const app = express();


app.use(cors()); // Enable CORS
app.use(express.json());


app.use("/api/get-data", )
