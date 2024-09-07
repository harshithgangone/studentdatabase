// routes/studentafterlogRoutes.js
const express = require('express');
const router = express.Router();
const SecondYears = require('../models/SecondYearsafterlog');
const ThirdYears = require('../models/ThirdYearsafterlog'); 
const FourthYears = require('../models/FourthYearsafterlog'); 
const currentDate = new Date();

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayOfWeek = daysOfWeek[currentDate.getDay()];
const month = monthsOfYear[currentDate.getMonth()];
const day = currentDate.getDate();
const yearr = currentDate.getFullYear();

router.get('/:year/:id', async (req, res) => {
    const { year, id } = req.params;

    try {
        const StudentModel = getStudentModel(year);
        const student = await StudentModel.findOne({ 'Roll No': id });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json({ 
            name: student.Name, 
            class: student.Section, 
            gpa: student.CGPA, 
            att: student.Attendance,
            fn: student.fathername,
            sno: student.studentno,
            fno: student.fatherno,
            ach: student.Achivements,
            cmp: student.Complaints,
            beh: student.Behaviour
        });
    } catch (error) {
        console.error('Error fetching student details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/:year/:id', async (req, res) => {
    const { year, id } = req.params;
    const { achievements, complaints, behaviour } = req.body;

    try {
        const StudentModel = getStudentModel(year);
        const filter = { 'Roll No': id };

        // Fetch existing student data
        const existingStudent = await StudentModel.findOne(filter);

        if (!existingStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Append new data to existing data
        if (achievements) existingStudent.Achivements += "\n"+achievements+`\t${day} ${month} ${dayOfWeek} ${yearr} ,`;
        if (complaints) existingStudent.Complaints += "\n"+complaints+`\t${day} ${month} ${dayOfWeek} ${yearr} ,`;
        if (behaviour) existingStudent.Behaviour += "\n"+behaviour+`\t${day} ${month} ${dayOfWeek} ${yearr} ,`;

        // Save updated student data
        await existingStudent.save();

        res.json(existingStudent);
    } catch (error) {
        console.error('Error updating student details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.put('/:year/:id', async (req, res) => {
    const { year, id } = req.params;
    const { achievements, complaints, behaviour } = req.body;

    try {
        const StudentModel = getStudentModel(year);
        const filter = { 'Roll No': id };
        const update = {};
        if (achievements) update.Achivements = achievements+`\t${day} ${month} ${dayOfWeek} ${yearr} ,`;
        if (complaints) update.Complaints = complaints+`\t${day} ${month} ${dayOfWeek} ${yearr} ,`;
        if (behaviour) update.Behaviour = behaviour+`\t${day} ${month} ${dayOfWeek} ${yearr} ,`;

        const updatedStudent = await StudentModel.findOneAndUpdate(filter, update, { new: true });

        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json(updatedStudent);
    } catch (error) {
        console.error('Error updating student details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

function getStudentModel(year) {
    switch (year) {
        case 'secondYears':
            return SecondYears;
        case 'thirdYears':
            return ThirdYears;
        case 'fourthYears':
            return FourthYears;
        default:
            throw new Error('Invalid year');
    }
}

module.exports = router;
