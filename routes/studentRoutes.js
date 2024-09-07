const express = require('express');
const router = express.Router();
const SecondYears = require('../models/SecondYears');
const ThirdYears = require('../models/ThirdYears'); // Import ThirdYears model
const FourthYears = require('../models/FourthYears'); // Import FourthYears model

router.get('/:year/:id', async (req, res) => {
    const { year, id } = req.params;

    try {
        const StudentModel = getStudentModel(year);
        const student = await StudentModel.findOne({ 'Roll No': id });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json({ name: student.Name, class: student.Section, gpa: student.CGPA });
    } catch (error) {
        console.error('Error fetching student details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

function getStudentModel(year) {
    switch (year) {
        case 'secondYears':
            return SecondYears;
        case 'thirdYears': // Add case for thirdYears
            return ThirdYears;
        case 'fourthYears': // Add case for fourthYears
            return FourthYears;
        default:
            throw new Error('Invalid year');
    }
}

module.exports = router;
