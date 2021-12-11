import exp from "constants";
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { studentrouter } from "./routes/student.js";
import { mentorrouter } from "./routes/mentor.js";
import { getstudentbyparams, getstudentbyid, deletestudentbyid, editbyid, createstudent } from "./studentmethod.js";
import { getmentorbyquery, getmentorbyid, deletementorbyid, editmentorbyid, creatementor } from "./mentormethod.js";
dotenv.config();
console.log(process.env);
const app = express();

const PORT = process.env.PORT;
app.use(express.json());
const mentor = [
  {"id":"100","mentor_name":"deepa","students":["mithran","maha","abishek","Iniyan"]},
  {"id":"101","mentor_name":"deepika","students":["mithun","mathi","abinesh","aravind"]},
{"id":"102","mentor_name":"raghul","students":["vignesh","uma","dhanya","vidhya"]}]

const student = [
  {"id":"200","student_name":"Iniyam","mentor_name":"deepa","batch":"b28wd"},
{"id":"201","student_name":"Ragavi","mentor_name":"ragul","batch":"b28wd"},
{"id":"202","student_name":"varun","mentor_name":"dhanalakshmi","batch":"b28wd"}]

// const MONGO_URL="mongodb://localhost";
//mongodb connection
const MONGO_URL=process.env.MONGO_URL;
async function createConnection(){
   const client=new MongoClient(MONGO_URL);
   await client.connect();
   console.log("mongodb is connected");
   return client;
}
export const client=await createConnection();

app.get("/", (request, response) => {
  response.send("Hello World!!!");
});

app.use("/student",studentrouter); //route student method  

app.use("/mentor",mentorrouter);//route mentor method



  

    
app.listen(PORT, () => console.log("App connected in ", PORT));


