import express from "express";
import { getmentorbyquery, getmentorbyid, deletementorbyid, editmentorbyid, creatementor } from "../mentormethod.js";
const router=express.Router();
router.route("/").get( async (request, response) => {
    
    
    const filter=request.query;
    const mentors=await getmentorbyquery(filter)
  console.log(filter);
  response.send(mentors);
    
    
  })
.post( async (request, response) => {
    const data=request.body;
    console.log(data);
   
    const result=await creatementor(data);
    response.send(result);
  });
  router.route("/:id").get(async (request, response) => {
    const {id}=request.params;
    console.log(id);
    const mentor1=await getmentorbyid(id);
  mentor1?
  response .send(mentor1)
  :response.status(404).send({message:"no mentor found"})
  })
  .delete(async (request, response) => {
    const {id}=request.params;
    console.log(id);
    const deleteditem=await deletementorbyid(id);
    deleteditem.deletedCount>0?
  response .send(deleteditem)
  :response.status(404).send({message:"no mentor found"})

  })
  .put(async (request, response) => {
    const {id}=request.params;
    console.log(id);
    const data=request.body;
    const editeditem=await editmentorbyid(id, data);
    const update=await getmentorbyid(id);
    response.send(update);

  });

  
  

    export const mentorrouter=router;