import StudentServiceImpl from "../services/StudentServiceImpl";
import Student from "../models/Student";
import { Scores } from "../models/Student";

export default class StudentController {
    private studentService: StudentServiceImpl;

    constructor(studentService: StudentServiceImpl) {
        this.studentService = studentService;
    }

    addStudent(student: Student): boolean {
        return this.studentService.addStudent(student);
    }

    getStudent(id: string): Student {
        return this.studentService.getStudent(id);
    }

    removeStudent(id: string): Student {
        return this.studentService.removeStudent(id);
    }

    updateStudent(id: string, scores: Scores): Student {
        return this.studentService.updateStudent(id, scores);
    }

    getQuantityStudents(): { quantity: number } {
        return this.studentService.getQuantityStudents();
    }

    getStudentsByName(name: string): Student[] {
        return this.studentService.getStudentsByName(name);
    }

    getAverageScoreByExam(exam: string): { exam: string, averageScore: number } {
        return this.studentService.getAverageScoreByExam(exam as keyof Scores);
    }
}
