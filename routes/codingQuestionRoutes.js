const express = require('express');
const passport = require('passport');
const codingQuestionController = require('../controllers/codingQuestionController');
const { isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Admin-only routes
router.post('/', passport.authenticate('jwt', { session: false }), isAdmin, codingQuestionController.createCodingQuestion);
router.put('/:id', passport.authenticate('jwt', { session: false }), isAdmin, codingQuestionController.updateCodingQuestion);
router.delete('/:id', passport.authenticate('jwt', { session: false }), isAdmin, codingQuestionController.deleteCodingQuestion);

// Public routes for getting questions (but still need to authenticate)
router.get('/', passport.authenticate('jwt', { session: false }), isAdmin, codingQuestionController.getAllCodingQuestions);
router.get('/:id', passport.authenticate('jwt', { session: false }), isAdmin, codingQuestionController.getCodingQuestionById);

module.exports = router;
