const mongoose = require('mongoose');

const attendancesecondyearSchema = new mongoose.Schema({
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

const attendancesecondyear = mongoose.model('attendancesecondyear', attendancesecondyearSchema);

module.exports = attendancesecondyear;
