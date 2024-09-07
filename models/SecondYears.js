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
    }
});

const SecondYears = mongoose.model('secondYears', secondYearsSchema);

module.exports = SecondYears;
