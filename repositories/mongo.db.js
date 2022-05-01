import mongoose from "mongoose";

async function connect(){
 
    const uri = "mongodb+srv://root:8pNoW1EcfA63jRUV@cluster0.63sgx.mongodb.net/livraria?retryWrites=true&w=majority";
   return await mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})
}
   export { connect }