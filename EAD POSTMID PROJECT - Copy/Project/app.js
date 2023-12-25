import express from 'express';
import bodyParser from 'body-parser';
import { dbConnect } from './database/index.js';
import cors from 'cors'

import { PORT } from './config/index.js';

import studentRoutes from './Routes/student.js';
import interestRoutes from './Routes/interest.js';
import userRoutes from './Routes/user.js';
import graphRoutes from './Routes/graph.js';
import actionRoutes from './Routes/actionlog.js';

const app=express();
app.use(cors());


dbConnect();
app.use(bodyParser.json());



app.use('/Student',studentRoutes);
app.use('/Interest',interestRoutes);
app.use('/User',userRoutes);
app.use('/Graph',graphRoutes);
app.use('/Actions',actionRoutes);



app.listen(PORT,()=>console.log(`SERVER RUNNING NOW...${PORT}`));