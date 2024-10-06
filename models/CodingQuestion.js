const mongoose = require('mongoose');

const codingQuestionSchema = new mongoose.Schema({

    category_id: { type: String, required: true },  // Foreign key
    title: { type: String, required: true,unique:true },
    description: { type: String, required: true },
    constraints: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    sample_input: { type: String, required: true },
    sample_output: { type: String, required: true },
    starter_code: { type: Map, of: String, required: true }, // Starter code for multiple languages
    max_execution_time: { type: Number, required: true }, // Maximum execution time in seconds
    isPublished: { type: Boolean, default: false }, // Default is false
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('CodingQuestion', codingQuestionSchema);
