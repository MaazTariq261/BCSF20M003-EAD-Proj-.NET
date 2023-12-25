import  express  from "express";
import {TopInterests,BottomInterests,getTotalInterests,
    getStudentsByCity,getStudentsCreatedDaily,
    getStudentAgeDistribution,getStudentsByDepartment,
    getStudentsByDegree,getStudentsByGender,getStudentStatus} from "../Controllers/Graph.js";

const router=express.Router();



router.get('/GetTop',TopInterests)
router.get('/GetBottom',BottomInterests)
router.get('/GetTotalInterets',getTotalInterests)
router.get('/GetStudentsByCity',getStudentsByCity)
router.get('/GetStudentsCreatedDaily',getStudentsCreatedDaily)
router.get('/GetStudentAgeDistribution',getStudentAgeDistribution)
router.get('/GetStudentsByDepartment',getStudentsByDepartment)
router.get('/GetStudentsByDegree',getStudentsByDegree)
router.get('/GetStudentsByGender',getStudentsByGender)
router.get('/GetStudentStatus',getStudentStatus)




export default router;
