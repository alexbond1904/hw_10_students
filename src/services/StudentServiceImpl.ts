import Student, { Scores } from "../models/Student";
import StudentService from "./StudentService";
import StudentRepository from "../dao/StudentRepository";

export default class StudentServiceImpl implements StudentService {
    private studentsRepository = new StudentRepository();



    addStudent(student: Student): boolean {
        if (!student.id)  throw new Error("Not a valid id");
        if (!student.name || student.name.length<2)  throw new Error("Not a valid name");

        this.validateScores(student.scores);

        const students:Student[] = this.studentsRepository.readAll();
        if (students.findIndex(s=>s.id === student.id) >= 0) {
            throw new Error("Student already exist");
        }
        students.push(student);
        this.studentsRepository.writeAll(students);
        return true;
    }

    getStudent(id: string): Student {
        if(id==="") throw new Error("Not a valid id");

        const students:Student[] = this.studentsRepository.readAll();
        const student:Student|undefined = students.find(s=>s.id+"" === id);
        if (!student) throw new Error("Student not found");
        return student;
    }

    removeStudent(id: string): Student {
        if(id==="") throw new Error("Not a valid id");

        const students:Student[] = this.studentsRepository.readAll();
        const index = students.findIndex(s=>s.id+"" === id);
        if(index < 0) throw new Error("Student not found");
        const victim = students[index];
        students.splice(index,1);
        this.studentsRepository.writeAll(students);
        return victim;
    }

    updateStudent(id: string, scores: Scores): Student {
        if(id==="") throw new Error("Not a valid id");

        this.validateScores(scores);

        const students:Student[] = this.studentsRepository.readAll();
        const index = students.findIndex(s=>s.id+"" === id);
        if(index < 0) throw new Error("Student not found");
        students[index].scores = scores;
        this.studentsRepository.writeAll(students);
        return students[index];
    }

    getQuantityStudents(): { quantity: number } {
        const size:number = this.studentsRepository.readAll().length;
        return { quantity: size };
    }

    getStudentsByName(name: string): Student[] {
        if (!name || name.trim().length < 2) throw new Error("Not a valid name");

        const students: Student[] = this.studentsRepository.readAll();
        return students.filter(s => s.name.toLowerCase().includes(name.toLowerCase()));
    }

    getAverageScoreByExam(exam: keyof Scores): { exam: string, averageScore: number } {
        const validExams = ["math", "eng", "art"];
        if (!validExams.includes(exam)) throw new Error("Not a valid exam");

        const students: Student[] = this.studentsRepository.readAll();
        const scores = students
            .map(s => s.scores[exam as keyof Scores])

        if (scores.length === 0) throw new Error(`No scores for exam: ${exam}`);

        const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        return { exam, averageScore };
    }

    private validateScores(scores: Scores): void {
        const errors: string[] = [];

        if (!scores.art || scores.art < 0 || scores.art > 100) errors.push("art");
        if (!scores.math || scores.math < 0 || scores.math > 100) errors.push("math");
        if (!scores.eng || scores.eng < 0 || scores.eng > 100) errors.push("eng");

        if (errors.length > 0) {
            throw new Error("Not a valid scores: "+errors.join(", "));
        }
    }

}
