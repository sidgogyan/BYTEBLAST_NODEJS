const Submission = require('../models/Submission');

// Create a Submission
exports.createSubmission = async (req, res) => {
    try {
        const { user_id, coding_question_id, language_id, submitted_code, status, execution_time, memory_used } = req.body;

        // Validate required fields
        if (!user_id || !coding_question_id || !language_id || !submitted_code) {
            return res.status(400).json({ error: 'Required fields are missing' });
        }

        const submission = new Submission({
            user_id,
            coding_question_id,
            language_id,
            submitted_code,
            status,
            execution_time,
            memory_used
        });

        await submission.save();
        res.status(201).json(submission);
    } catch (error) {
        res.status(500).json({ error: 'Error creating submission', details: error.message });
    }
};

// Get all Submissions
exports.getAllSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find();
        res.json(submissions);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching submissions' });
    }
};

// Get Submission by ID
exports.getSubmissionById = async (req, res) => {
    try {
        const submission = await Submission.findOne({ id: req.params.id });
        if (!submission) return res.status(404).json({ error: 'Submission not found' });
        res.json(submission);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching submission' });
    }
};

// Update a Submission (Admin only)
exports.updateSubmission = async (req, res) => {
    try {
        const { status, execution_time, memory_used } = req.body;
        
        const updatedFields = { status, execution_time, memory_used };

        const submission = await Submission.findOneAndUpdate(
            { id: req.params.id },
            updatedFields,
            { new: true }
        );

        if (!submission) return res.status(404).json({ error: 'Submission not found' });
        res.json(submission);
    } catch (error) {
        res.status(500).json({ error: 'Error updating submission' });
    }
};

// Delete a Submission (Admin only)
exports.deleteSubmission = async (req, res) => {
    try {
        const submission = await Submission.findOneAndDelete({ id: req.params.id });
        if (!submission) return res.status(404).json({ error: 'Submission not found' });
        res.json({ message: 'Submission deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting submission' });
    }
};
