import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    todobody: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    },
    { 
    timestamps:true,
    },
);

export default mongoose.model('Todos',TodoSchema);