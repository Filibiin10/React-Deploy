import mongoose from 'mongoose';
import express, { json } from "express";
import cors from 'cors'
import chalk from 'chalk';
import { register } from './controller/userControler.js';

const app=express();

app.use(cors());
app.use(express.json())

const PORT=4000;
const dbURL = "mongodb+srv://filibiinfanax10:Filibiin123@cluster0.vurfpiv.mongodb.net/?retryWrites=true&w=majority"


mongoose.connect(dbURL)
.then(()=> {
    console.log(`${chalk.green.bold('Connected to MongoDB :')}${dbURL}`)
}).catch((err) => {
    console.error("Error connecting to MongoDB", err)
    process.exit(1)
})

app.post('/api/register',register)
app.listen(PORT,()=>{
    console.log(`server running on Port ${PORT}`);
})