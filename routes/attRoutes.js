const express = require('express');
const router = express.Router();
const attendancesecondyear = require('../models/attsecond');
const attendancethirdyear = require('../models/attthird'); // Import ThirdYears model
const attendancefourthyear = require('../models/attfourth'); // Import FourthYears model

router.get('/:year/:id', async (req, res) => {
    const { year, id } = req.params;

    try {
        const StudentModel = getStudentModel(year);
        const student = await StudentModel.findOne({ 'Roll No': id });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json({ name: student.Name, class:student.class, att:student.Attendance });
    } catch (error) {
        console.error('Error fetching student details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

function getStudentModel(year) {
    switch (year) {
        case 'secondYears':
            return attendancesecondyear;
        case 'thirdYears': // Add case for thirdYears
            return attendancethirdyear;
        case 'fourthYears': // Add case for fourthYears
            return attendancefourthyear;
        default:
            throw new Error('Invalid year');
    }
}

module.exports = router;
