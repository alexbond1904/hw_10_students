import {Router} from "express";
import StudentServiceImpl from "../services/StudentServiceImpl";
import StudentController from "../controller/StudentController";
import asyncHandler from 'express-async-handler';
import Student from "../models/Student";

const router = Router();

const studentService = new StudentServiceImpl();
const studentController = new StudentController(studentService);

router.get("/student", asyncHandler(async (req, res) => {
    const {id} = req.query;
    const {name} = req.query;
    if (name && !id) {
        const students = studentController.getStudentsByName(name as string);
        res.status(200).send({students});

    } else if (id && !name) {
        const student = studentController.getStudent(id as string);
        if (student) {
            res.status(200).send({student});
        }
    } else {
        res.status(400).send("Not a valid request");
    }
}))

router.post("/student", asyncHandler(async (req, res) => {
    const student = req.body as Student;
    const isSuccess = studentController.addStudent(student);
    if (isSuccess) {
        res.status(200).send({status: "Student is added"});
    }
}))

router.delete("/student", asyncHandler(async (req, res) => {
    const {id} = req.query;
    const removedStudent = studentController.removeStudent(id as string);
    if (removedStudent) {
        res.status(200).send({status: "Student removed", student: removedStudent});
    }
}));

router.put("/student", asyncHandler(async (req, res) => {
    const {id} = req.query;
    const scores = req.body.scores;
    const updatedStudent = studentController.updateStudent(id as string, scores);
    if (updatedStudent) {
        res.status(200).send({status: "Student updated", student: updatedStudent});
    }
}));

router.get("/quantity/students", asyncHandler(async (req, res) => {
    const quantity = studentController.getQuantityStudents();
    res.status(200).send(quantity);
}));


router.get("/students", asyncHandler(async (req, res) => {
    const {exam} = req.query;
    const averageScore = studentController.getAverageScoreByExam(exam as string);
    res.status(200).send(averageScore);
}));

export default router;
