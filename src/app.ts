import express, {Request, Response, Application, NextFunction} from 'express'
import studentsRoutes from "./routes/studentsRoutes";

const app:Application = express();
const PORT = 3000

app.use(express.json());

app.use('/api', studentsRoutes);

app.use((err:Error, req:Request, res: Response, next:NextFunction) =>{
    console.log(err.message);
    res.status(404).json({error: err.message});
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/api/students`)
})