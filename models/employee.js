const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },
    employeeId: {
        type: Number,
        unique: [true, 'ID number not available'],
        immutable: true, 
        required: true
    },
    position: {
        type: String,
        required: [true, 'Position is required']
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    isSupervisor: {
        type: Boolean,
        required: true,
        default: false
    }, 
   

})

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;

