// importing mongoose
import mongoose from "mongoose";

// define doctor schema
const doctorSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    role : {
        type: String,
        required: true
    },
    experience : {
        type: Number,
        required: true
    },
    qualification : {
        type: String,
        required: true
    },
    city : {
        type: String,
        required: true
    },
    state : {
        type: String,
        required: true
    },
    hospital : {
        type: String,
        required: true
    },
    mode : {
        type: String,
        required: true
    },
    fees : {
        type: Number,
        required: true
    },
    language : {
        type: Array,
        required: true
    },
    profileImage: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// export doctor schema
export default mongoose.models.doctor || mongoose.model("doctor", doctorSchema);