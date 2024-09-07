const mongoose = require('mongoose');

const secondYearsSchema = new mongoose.Schema({
    'Roll No': {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Section:{
        type:String,
        required:true
    },
    CGPA:{
        type:String,
        required:true
    },
    Attendance:{
        type:String,
        required:true
    },
    fathername:{
        type:String,
        required:true
    },
    studentno:{
        type:String,
        required:true
    },
    fatherno:{
        type:String,
        required:true
    },
    Achivements:{
        type:String,
        required:true
    },
    Complaints:{
        type:String,
        required:true
    },
    Behaviour:{
        type:String,
        required:true
    }
}, { collection: 'secondyears' }); // Specify the collection name

const SecondYears = mongoose.model('SecondYearsafterlog', secondYearsSchema); // Use a capital letter for the model name

module.exports = SecondYears;
