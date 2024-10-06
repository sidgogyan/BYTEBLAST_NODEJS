const TestCase = require('../models/TestCase');

// Create a Test Case (Admin only)
exports.createTestCase = async (req, res) => {
    try {
        const {
            coding_question_id, input_data, expected_output, time_limit,
            memory_limit, is_sample, is_published
        } = req.body;

        // Validation for required fields
        if (!coding_question_id || !input_data || !expected_output || !time_limit || !memory_limit) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const testCase = new TestCase({
            coding_question_id,
            input_data,
            expected_output,
            time_limit,
            memory_limit,
            is_sample,
            is_published
        });

        await testCase.save();
        res.status(201).json(testCase);
    } catch (error) {
        res.status(400).json({ error: 'Error creating test case', details: error.message });
    }
};

// Get all Test Cases
exports.getAllTestCases = async (req, res) => {
    try {
        const testCases = await TestCase.find();
        res.json(testCases);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching test cases' });
    }
};

// Get a Test Case by ID
exports.getTestCaseById = async (req, res) => {
    try {
        const testCase = await TestCase.findOne({ id: req.params.id });
        if (!testCase) return res.status(404).json({ error: 'Test case not found' });
        res.json(testCase);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching test case' });
    }
};

// Update a Test Case (Admin only)
exports.updateTestCase = async (req, res) => {
    try {
        const {
            coding_question_id, input_data, expected_output, time_limit,
            memory_limit, is_sample, is_published
        } = req.body;

        const updatedFields = {
            coding_question_id, input_data, expected_output,
            time_limit, memory_limit, is_sample, is_published
        };

        const testCase = await TestCase.findOneAndUpdate(
            { id: req.params.id },
            updatedFields,
            { new: true }
        );

        if (!testCase) return res.status(404).json({ error: 'Test case not found' });
        res.json(testCase);
    } catch (error) {
        res.status(400).json({ error: 'Error updating test case', details: error.message });
    }
};

// Delete a Test Case (Admin only)
exports.deleteTestCase = async (req, res) => {
    try {
        const testCase = await TestCase.findOneAndDelete({ id: req.params.id });
        if (!testCase) return res.status(404).json({ error: 'Test case not found' });
        res.json({ message: 'Test case deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting test case' });
    }
};
