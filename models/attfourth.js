const mongoose = require('mongoose');

const attendancefourthyearSchema = new mongoose.Schema({
    'Roll No': {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    Attendance:{
        type:String,
        required:true
    }
});

const attendancefourthyear = mongoose.model('attendancefourthyear', attendancefourthyearSchema);

module.exports = attendancefourthyear;
