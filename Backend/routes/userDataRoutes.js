import express from 'express'
import getUserData from '../controllers/userDataControler.js';
import {authUser} from '../middlewares/userAuth.js';

const userData = express.Router();

userData.get("/data",authUser,getUserData);

export default userData;