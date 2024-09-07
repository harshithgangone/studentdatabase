const mongoose = require('mongoose');

const fourthYearsSchema = new mongoose.Schema({
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
    }
});

const FourthYears = mongoose.model('fourthYears', fourthYearsSchema);

module.exports = FourthYears;
