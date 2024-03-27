import mongoose from 'mongoose';
import israeliIdValidator from 'israeli-id-validator';

const staffSchema=new mongoose.Schema({
    id: {
        type: String,
        required: true,
        validate: {
            validator: israeliIdValidator, // Use the entire module as validator
            message: props => `${props.value} is not a valid Israeli ID!`
        }
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    }
}, { versionKey: false });

const staffModel=mongoose.model("staffs",staffSchema);

export default  staffModel;