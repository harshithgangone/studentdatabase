const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const dotenv = require('dotenv'); // Add this line
const studentRoutes = require('./routes/studentRoutes');
const loginRoutes = require('./routes/loginRoutes'); // Import loginRoutes
const attRoutes = require('./routes/attRoutes'); // Import attendanceroutes
const studentafterlogRoutes = require('./routes/studentafterlogRoutes'); // Import attendanceroutes
const path = require('path');

dotenv.config(); // Add this line to load environment variables

const app = express();
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/student_database', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this line to handle URL-encoded form data

// Set up session with the secret from environment variables
const sessionSecret = process.env.SESSION_SECRET;

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000 // session expiry time in milliseconds (e.g., 1 minute)
  }
}));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to prevent caching
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  
  // Placeholder for authentication logic
  if (username === 'user' && password === 'password') {
    req.session.isAuthenticated = true; // Set session variable
    res.redirect('/afterlog');
  } else {
    res.send('<h1>Invalid credentials!! :( </h1>');
  }
});

app.get('/afterlog', (req, res) => {
  if (req.session.isAuthenticated) {
    res.render('afterlog');
  } else {
    res.redirect('/');
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/afterlog');
    }
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});
app.post('/adminoptions', (req, res) => {
  res.render('a_searchlog')
});

// Middleware to protect routes
app.use((req, res, next) => {
  if (req.session.isAuthenticated || req.path === '/' || req.path === '/login' || req.path === '/logout') {
    next();
  } else {
    res.redirect('/');
  }
});

// Routes
app.use('/api/students', studentRoutes);
app.use('/api', loginRoutes); // Use loginRoutes middleware
app.use('/api/attendance', attRoutes); // Use loginRoutes middleware
app.use('/api/studentsafterlog', studentafterlogRoutes); // Use loginRoutes middleware

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
