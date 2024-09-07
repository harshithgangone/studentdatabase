const mongoose = require('mongoose');

const thirdYearsSchema = new mongoose.Schema({
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

const ThirdYears = mongoose.model('thirdYears', thirdYearsSchema);

module.exports = ThirdYears;
