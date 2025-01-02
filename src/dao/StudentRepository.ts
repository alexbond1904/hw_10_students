import * as fs from "node:fs";
import Student from "../models/Student";

export default class StudentRepository {
    private readonly filePath: string;

    constructor(filePath = './db.txt') {
        this.filePath = filePath;
    }

    readAll(): Student[] {
        try {
            const res = fs.readFileSync(this.filePath,{encoding:'utf-8'});
            return JSON.parse(res) as Student[];
        } catch (err: any) {
            console.error(`Error -> ${err}`);
            return [];
        }
    }

    writeAll(student: Student[]):boolean {
        try {
            const data = JSON.stringify(student,null,2);
            fs.writeFileSync(this.filePath,data,{encoding:'utf-8'});
            return true;
        }catch (err){
            console.error(err)
            return false;
        }
    }
}