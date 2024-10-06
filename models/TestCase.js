const mongoose = require('mongoose');


const testCaseSchema = new mongoose.Schema({
  
    coding_question_id: { type: String, required: true },  // Foreign key to CodingQuestions
    input_data: { type: String, required: true },
    expected_output: { type: String, required: true },
    time_limit: { type: Number, required: true },  // Time limit in seconds
    memory_limit: { type: Number, required: true },  // Memory limit in MB
    is_sample: { type: Boolean, default: false },  // Whether this is a sample test case
    is_published: { type: Boolean, default: false }, // Whether the test case is published
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('TestCase', testCaseSchema);


