import mongoose from "mongoose"

mongoose.connect("mongodb+srv://admin:FdUWnw9fVfUGJdZA@linkapi.lhkas.mongodb.net/linkapi");

let db = mongoose.connection;

export default db; 