import  express  from "express";
import {getDailyActions} from "../Controllers/ActionLog.js";

const router=express.Router();



router.get('/Get',getDailyActions)


export default router;
