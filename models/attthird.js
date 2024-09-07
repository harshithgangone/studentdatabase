const mongoose = require('mongoose');

const attendancethirdyearSchema = new mongoose.Schema({
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

const attendancethirdyear = mongoose.model('attendancethirdyear', attendancethirdyearSchema);

module.exports = attendancethirdyear;
