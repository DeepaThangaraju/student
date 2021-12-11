import { client } from "./index.js";
//it contains query that retrive  the data from mongodb
async function editmentorbyid(id, data) {
    return await client
        .db("studentmentor")
        .collection("mentor")
        .updateOne({ id: id }, { $set: data });
}
async function creatementor(data) {
    return await client
        .db("studentmentor")
        .collection("mentor")
        .insertMany(data);
}
async function deletementorbyid(id) {
    return await client
        .db("studentmentor")
        .collection("mentor")
        .deleteOne({ id: id });
}
async function getmentorbyid(id) {
    return await client
        .db("studentmentor")
        .collection("mentor")
        .findOne({ id: id });
}
async function getmentorbyquery(filter) {
    return await client.db("studentmentor").collection("mentor").find(filter).toArray();
}
export { getmentorbyquery, getmentorbyid, deletementorbyid, editmentorbyid, creatementor }
