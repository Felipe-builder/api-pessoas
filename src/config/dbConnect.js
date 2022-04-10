import mongoose from "mongoose"

mongoose.connect("mongodb+srv://admin1:hdaslRNBCnP1sNY4@linkapi.lhkas.mongodb.net/linkapi");

let db = mongoose.connection;

export default db; 