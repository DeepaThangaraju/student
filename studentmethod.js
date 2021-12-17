import { client } from "./index.js";
import {ObjectId} from "mongodb";
//it contains query that retrive  the data from mongodb
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
        .updateOne({id:id}, { $set: data });
}
 async function deletestudentbyid(id) {
     console.log(id);
    return await client
        .db("studentmentor")
        .collection("student")
        .deleteOne({ id:id });
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

export {getstudentbyparams, getstudentbyid, deletestudentbyid, editbyid, createstudent };