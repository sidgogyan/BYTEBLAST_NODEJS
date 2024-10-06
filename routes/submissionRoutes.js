const express = require('express');
const passport = require('passport');
const submissionController = require('../controllers/submissionController');
const { isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a Submission
router.post('/', passport.authenticate('jwt', { session: false }), submissionController.createSubmission);

// Get all Submissions
router.get('/', passport.authenticate('jwt', { session: false }), submissionController.getAllSubmissions);

// Get a Submission by ID
router.get('/:id', passport.authenticate('jwt', { session: false }), submissionController.getSubmissionById);

// Admin-only routes to update and delete submissions
router.put('/:id', passport.authenticate('jwt', { session: false }), isAdmin, submissionController.updateSubmission);
router.delete('/:id', passport.authenticate('jwt', { session: false }), isAdmin, submissionController.deleteSubmission);

module.exports = router;
