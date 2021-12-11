import express from "express";
import { getstudentbyparams, getstudentbyid, deletestudentbyid, editbyid, createstudent } from "../studentmethod.js"
const router=express.Router();
router.get("/", async (request, response) => {
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
  router.get("/:id",async (request, response) => {
    const {id}=request.params;
    console.log(id);
    const student1=await getstudentbyid(id);
  //   const student1=student.find((mv)=>id===mv.id);
  student1?
  response .send(student1)
  :response.status(404).send({message:"no student found"})
  //   :response.status(404).send({message:"Student not foun"});
  });
  
  router.delete("/:id",async (request, response) => {
      const {id}=request.params;
      console.log(id);
      const deleteditem=await deletestudentbyid(id);
      deleteditem.deletedCount>0?
    response .send(deleteditem)
    :response.status(404).send({message:"no student found"})
  
    });
  
    router.put("/:id",async (request, response) => {
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
  
    router.post("/", async (request, response) => {
      const data=request.body;
      // console.log(data);
     
      const result=await createstudent(data);
      response.send(result);
    });

    export const studentrouter=router;