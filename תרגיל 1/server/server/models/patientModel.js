import mongoose from 'mongoose';
import israeliIdValidator from 'israeli-id-validator';

const patientSchema = new mongoose.Schema({
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
    address: {
        type: {
            city: {
                type: String,
                required: true
            },
            street: {
                type: String,
                required: true
            },
            buildingNumber: {
                type: Number,
                required: true,
                validate: {
                    validator: function(v) {
                        return v >= 0; // Ensure buildingNumber is not negative
                    },
                    message: props => `${props.value} is not a valid building number!`
                }
            }
        },
        required: true
    },
    birthDate:{
        type: Date,
        required: true,
        validate: {
            validator: function(v) {
                const minDate = new Date();
                minDate.setFullYear(minDate.getFullYear() - 120); // Set max date 120 years ago
                return v <= new Date() && v >= minDate; // Check if birthDate is within the last 120 years
            },
            message: props => `${props.value} is not a valid birth date!`
        }
    },
    tel: String,
    mobilePhone:{
        type: Number,
        required: true
    },
    image: String
}, { versionKey: false });

const patientModel = mongoose.model("patients", patientSchema);

export default patientModel;
// import mongoose from 'mongoose';

// const clientSchema=new mongoose.Schema({
//     id: String,
//     firstName:String,
//     lastName:String,
//     address: {
//         type: {
//             city: String,
//             street: String,
//             buildingNumber: Number
//         },
//     },
//     birthDate:Date,
//     tel:String,
//     mobilePhone:String,
//     image: String
// }, { versionKey: false });

// const clientModel=mongoose.model("clients",clientSchema);

// export default  clientModel;