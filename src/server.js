import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
//import cors from 'cors';
const cors = require('cors');
import config from './config';
import initRoutes from './routes';

const app = express();

//MiddleWares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


//DBconnection
mongoose.Promise = global.Promise;
mongoose.connect(config.URI, { useNewUrlParser: true });

//Route initialize
initRoutes(app);

//start the server
app.listen(config.PORT, console.log(`server running on port ${config.PORT}`));



