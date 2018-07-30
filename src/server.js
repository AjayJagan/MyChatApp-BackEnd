import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
const cors = require('cors');
import config from './config';
import initRoutes from './routes';
const http = require('http');
import socket from './controllers/socketController';

const app = express();

//MiddleWares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//DBconnection
mongoose.Promise = global.Promise;
mongoose.connect(config.URI, { useNewUrlParser: true });

//Route initialize
initRoutes(app);

//start the server
const server = http.createServer(app).listen(config.PORT, console.log(`server running on port ${config.PORT}`));

//web socket initilization
socket(server);



