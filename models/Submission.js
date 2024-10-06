const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
   
    user_id: { type: String, required: true },  // Foreign key to Users
    coding_question_id: { type: String, required: true },  // Foreign key to CodingQuestions
    language_id: { type: String, required: true },  // Foreign key to Languages
    submitted_code: { type: String, required: true },
    submission_time: { type: Date, default: Date.now },
    status: { 
        type: String, 
        enum: ['Accepted', 'Wrong Answer', 'TLE', 'Runtime Error'], 
        default: 'Wrong Answer'
    },
    execution_time: { type: Number, default: 0 },  // Time taken to execute the code in seconds
    memory_used: { type: Number, default: 0 },  // Memory used in MB
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);
