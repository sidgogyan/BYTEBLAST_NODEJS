const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
require('dotenv').config();
require("./config/passport")

const authRoutes = require('./routes/authRoutes');
const categoryRoutes=require('./routes/categoryRoutes')
const codingQuestionRoutes = require('./routes/codingQuestionRoutes');
const testCaseRoutes=require("./routes/testCaseRoutes");
const submissionRoutes=require("./routes/submissionRoutes");

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes); 
app.use('/api/coding-questions', codingQuestionRoutes);
app.use('/api/test-cases', testCaseRoutes);
app.use('/api/submission', submissionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
