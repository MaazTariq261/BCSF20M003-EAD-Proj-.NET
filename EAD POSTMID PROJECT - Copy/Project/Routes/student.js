import  express  from "express";
import {addStudent,deleteStudent,getAllStudents,getStudentById,updateStudent } from '../Controllers/Student.js';
import { authenticateUser } from '../Middleware/auth.js'


const router=express.Router();


router.post('/Add',authenticateUser,addStudent)//all type of user register
router.get('/GetAll',getAllStudents)
router.get('/GetSingle/:id',authenticateUser,getStudentById)
router.patch('/Update/:id',authenticateUser,updateStudent)
router.delete('/Delete/:id',authenticateUser,deleteStudent)


export default router;
