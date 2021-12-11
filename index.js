import express from "express";
import { MongoClient } from "mongodb";
const app = express();

const PORT = 9000;
const mentor = [
  {"id":"100","mentor_name":"deepa","students":["mithran","maha","abishek","Iniyan"]},
  {"id":"101","mentor_name":"deepika","students":["mithun","mathi","abinesh","aravind"]},
{"id":"102","mentor_name":"raghul","students":["vignesh","uma","dhanya","vidhya"]}]

const student = [
  {"id":"200","student_name":"Iniyam","mentor_name":"deepa","batch":"b28wd"},
{"id":"201","student_name":"Ragavi","mentor_name":"ragul","batch":"b28wd"},
{"id":"202","student_name":"varun","mentor_name":"dhanalakshmi","batch":"b28wd"}]

// const MONGO_URL="mongodb://localhost";
// async function createConnection(){
//    const client=new MongoClient(MONGO_URL);
//    await client.connect();
//    console.log("mongodb is connected");
//    return client;
// }
// const client=await createConnection();

app.get("/", (request, response) => {
  response.send("Hello World!!!");
});
app.get("/student", async (request, response) => {
  // const student= await client.db("studentmentor").collection("student").find({});
  console.log(request.query);
  const {student_name,mentor_name}=request.query;
  if(student_name){
  const byname=student.filter((st)=>student_name===st.student_name);
  response.send(byname);
  }else{
    response.send(student);
  }
  
  
  
});
app.get("/student/:id",(request, response) => {
  const {id}=request.params;
  console.log(id);
  const student1=student.find((mv)=>id===mv.id);
student1?
response .send(student1)
:response.status(404).send({message:"no student found"})
//   :response.status(404).send({message:"Student not foun"});
});

app.listen(PORT, () => console.log("App connected in ", PORT));
