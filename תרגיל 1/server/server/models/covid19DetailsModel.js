// import mongoose from 'mongoose';

// const covid19Schema = new mongoose.Schema({
//     clientId: {
//         type: mongoose.Schema.Types.String,
//         ref: 'Client' // Reference to the corresponding client in the clients collection
//     },
//     vaccineDates: {
//         type: [
//             {
//                 dateReceived: Date,
//                 manufacturer: String
//             }
//         ],
//         validate: [arrayLimit, '{PATH} exceeds the limit of 4'] // Custom validator function
//     },
//     positiveTestDate: Date,
//     recoveryDate: Date
// }, { versionKey: false });

// // Custom validator function to limit the array size
// function arrayLimit(val) {
//     return val.length < 4;
// }

// const covid19Model = mongoose.model("covid19Details", covid19Schema);

// export default covid19Model;

import mongoose from 'mongoose';
import israeliIdValidator from 'israeli-id-validator';

const today = new Date(); // תאריך היום

const covid19Schema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.String,
        ref: 'patients',// Reference to the corresponding patient in the patients collection
        required: true, // Adding required constraint
        validate: {
            validator: israeliIdValidator, // Use the entire module as validator
            message: props => `${props.value} is not a valid Israeli ID!`
        }
    },
    vaccineDates: {
        type: [
            {
                dateReceived: Date,
                manufacturer: String
            }
        ],
        validate: [arrayLimit, '{PATH} exceeds the limit of 4'] // Custom validator function
    },
    positiveTestDate: {
        type: Date,
        validate: [DateValidator, 'Positive test date must be before or equal to today\'s date.']
    },
    recoveryDate: {
        type: Date,
        validate: [DateValidator, 'Recovery date must be before or equal to today\'s date.']
    }
}, { versionKey: false });

// Custom validator function to limit the array size
function arrayLimit(val) {
    return val.length < 4;
}

function DateValidator(value) {
    return value <= today;
}

const covid19Model = mongoose.model("covid19Details", covid19Schema);

export default covid19Model;