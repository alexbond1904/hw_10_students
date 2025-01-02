import Student, {Scores} from "../models/Student";

export default interface StudentService {
    addStudent(student: Student): boolean;

    getStudent(id:string): Student;

    removeStudent(id:string): Student;

    updateStudent(id: string, scores:Scores): Student;

    getQuantityStudents(): {quantity: number};

    getStudentsByName(name:string): Student[];

    getAverageScoreByExam(exam:string): {exam: string, averageScore: number};
}