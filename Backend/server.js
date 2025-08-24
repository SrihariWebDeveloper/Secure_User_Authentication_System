import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import coonectDb  from './config/dbConfig.js';
import userRoute from './routes/userRoute.js';
import userData from './routes/userDataRoutes.js';

const app = express();
const Port = process.env.PORT || 3000;
coonectDb();

const allowedOrgins = ['https://secure-user-authentication-system-client.onrender.com'];

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrgins,credentials:true}));
app.use('/api/auth',userRoute);
app.use('/api/user',userData);



app.get('/',(req,res)=>{
    res.send("Started server");
})

app.listen(Port,()=>console.log(`server started at http://localhost:${Port}`));
