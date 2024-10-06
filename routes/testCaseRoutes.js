const express = require('express');
const passport = require('passport');
const testCaseController = require('../controllers/testCaseController');
const { isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Admin-only routes for creating, updating, deleting test cases
router.post('/', passport.authenticate('jwt', { session: false }), isAdmin, testCaseController.createTestCase);
router.put('/:id', passport.authenticate('jwt', { session: false }), isAdmin, testCaseController.updateTestCase);
router.delete('/:id', passport.authenticate('jwt', { session: false }), isAdmin, testCaseController.deleteTestCase);

// Public routes for getting test cases
router.get('/', passport.authenticate('jwt', { session: false }), testCaseController.getAllTestCases);
router.get('/:id', passport.authenticate('jwt', { session: false }), testCaseController.getTestCaseById);

module.exports = router;
