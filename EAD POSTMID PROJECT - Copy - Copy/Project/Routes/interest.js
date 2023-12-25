import  express  from "express";
import {addInterest  ,getAllInterests} from "../Controllers/Interets.js";

const router=express.Router();


router.post('/Add',addInterest)//all type of user register
router.get('/Get',getAllInterests)


export default router;
