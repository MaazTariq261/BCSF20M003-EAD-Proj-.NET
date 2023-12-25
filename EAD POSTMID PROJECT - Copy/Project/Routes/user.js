import  express  from "express";
import {register  ,login} from "../Controllers/User.js";

const router=express.Router();


router.post('/Register',register)//all type of user register
router.post('/Login',login)


export default router;
