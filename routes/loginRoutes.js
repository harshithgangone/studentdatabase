const express = require('express');
const router = express.Router();
const Password = require('../models/Password');

// Route to handle user login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user in the database
        const user = await Password.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare the password
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // If username and password match, send success response
        res.json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
