const CodingQuestion = require('../models/CodingQuestion');

// Create a coding question (Admin only)
exports.createCodingQuestion = async (req, res) => {
    try {
        const {
            category_id, title, description, constraints, difficulty,
            sample_input, sample_output, starter_code, max_execution_time
        } = req.body;

        // Validations for required fields
        if (!category_id || !title || !description || !constraints || !difficulty || !sample_input || !sample_output || !starter_code || !max_execution_time) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const codingQuestion = new CodingQuestion({
            category_id,
            title,
            description,
            constraints,
            difficulty,
            sample_input,
            sample_output,
            starter_code,
            max_execution_time
        });

        await codingQuestion.save();
        res.status(201).json(codingQuestion);
    } catch (error) {
        res.status(400).json({ error: 'Error creating coding question', details: error.message });
    }
};

// Get all coding questions (Admin only)
exports.getAllCodingQuestions = async (req, res) => {
    try {
        const questions = await CodingQuestion.find();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching coding questions' });
    }
};

// Get a single coding question by ID (Admin only)
exports.getCodingQuestionById = async (req, res) => {
    try {
        const question = await CodingQuestion.findOne({ id: req.params.id });
        if (!question) return res.status(404).json({ error: 'Coding question not found' });
        res.json(question);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching coding question' });
    }
};

// Update coding question (Admin only)
exports.updateCodingQuestion = async (req, res) => {
    try {
        const {
            category_id, title, description, constraints, difficulty,
            sample_input, sample_output, starter_code, max_execution_time, isPublished
        } = req.body;

        const updatedFields = {
            category_id, title, description, constraints, difficulty,
            sample_input, sample_output, starter_code, max_execution_time, isPublished
        };

        const question = await CodingQuestion.findOneAndUpdate(
            { id: req.params.id },
            updatedFields,
            { new: true }
        );

        if (!question) return res.status(404).json({ error: 'Coding question not found' });
        res.json(question);
    } catch (error) {
        res.status(400).json({ error: 'Error updating coding question', details: error.message });
    }
};

// Delete coding question (Admin only)
exports.deleteCodingQuestion = async (req, res) => {
    try {
        const question = await CodingQuestion.findOneAndDelete({ id: req.params.id });
        if (!question) return res.status(404).json({ error: 'Coding question not found' });
        res.json({ message: 'Coding question deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting coding question' });
    }
};
