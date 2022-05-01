import mongoose from "mongoose";

const AvaliacaoSchema = new mongoose.Schema(
    {
        name: String,
        nota: Number,
        avaliacao: String
    }, { collection:"livroInfo"}
    
)
export default AvaliacaoSchema;