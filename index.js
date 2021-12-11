import exp from "constants";
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env);
const app = express();

const PORT = 9000;
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
const MONGO_URL=process.env.MONGO_URL;
async function createConnection(){
   const client=new MongoClient(MONGO_URL);
   await client.connect();
   console.log("mongodb is connected");
   return client;
}
const client=await createConnection();

app.get("/", (request, response) => {
  response.send("Hello World!!!");
});
app.get("/student", async (request, response) => {
  // const student= await client.db("studentmentor").collection("student").find({});
  
  const filter=request.query;
  const students=await getstudentbyparams(filter)
//   if(student_name){
//   const byname=student.filter((st)=>student_name===st.student_name);
//   response.send(byname);
//   }else{
//     response.send(student);
//   }
console.log(filter);
response.send(students);
  
  
});
app.get("/student/:id",async (request, response) => {
  const {id}=request.params;
  console.log(id);
  const student1=await getstudentbyid(id);
//   const student1=student.find((mv)=>id===mv.id);
student1?
response .send(student1)
:response.status(404).send({message:"no student found"})
//   :response.status(404).send({message:"Student not foun"});
});

app.delete("/student/:id",async (request, response) => {
    const {id}=request.params;
    console.log(id);
    const deleteditem=await deletestudentbyid(id);
    deleteditem.deletedCount>0?
  response .send(deleteditem)
  :response.status(404).send({message:"no student found"})

  });

  app.put("/student/:id",async (request, response) => {
    const {id}=request.params;
    console.log(id);
    const data=request.body;
    const updateditem=await editbyid(id, data);
    const studentedited=await getstudentbyid(id);
    response .send(studentedited)
//     deleteditem.deletedCount>0?
//   response .send(deleteditem)
//   :response.status(404).send({message:"no student found"})

  });

app.post("/student", async (request, response) => {
    const data=request.body;
    // console.log(data);
   
    const result=await createstudent(data);
    response.send(result);
  });




  app.get("/mentor", async (request, response) => {
    
    
    const filter=request.query;
    const mentors=await client.db("studentmentor").collection("mentor").find(filter).toArray()
  console.log(filter);
  response.send(mentors);
    
    
  });
  app.get("/mentor/:id",async (request, response) => {
    const {id}=request.params;
    console.log(id);
    const mentor1=await client
    .db("studentmentor")
    .collection("mentor")
    .findOne({id:id});
  mentor1?
  response .send(mentor1)
  :response.status(404).send({message:"no mentor found"})
  });

  app.delete("/mentor/:id",async (request, response) => {
    const {id}=request.params;
    console.log(id);
    const deleteditem=await client
    .db("studentmentor")
    .collection("mentor")
    .deleteOne({id:id});
    deleteditem.deletedCount>0?
  response .send(deleteditem)
  :response.status(404).send({message:"no mentor found"})

  });

  
  app.post("/mentor", async (request, response) => {
      const data=request.body;
      console.log(data);
     
      const result=await client
      .db("studentmentor")
      .collection("mentor")
      .insertMany(data);
      response.send(result);
    });
app.listen(PORT, () => console.log("App connected in ", PORT));
async function createstudent(data) {
    return await client
        .db("studentmentor")
        .collection("student")
        .insertMany(data);
}

async function editbyid(id, data) {
    return await client
        .db("studentmentor")
        .collection("student")
        .updateOne({ id: id }, { $set: data });
}

async function deletestudentbyid(id) {
    return await client
        .db("studentmentor")
        .collection("student")
        .deleteOne({ id: id });
}

async function getstudentbyid(id) {
    return await client
        .db("studentmentor")
        .collection("student")
        .findOne({ id: id });
}

async function getstudentbyparams(filter) {
    return await client.db("studentmentor").collection("student").find(filter).toArray();
}

