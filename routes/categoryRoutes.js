const express = require('express');
const passport = require('passport');
const categoryController = require('../controllers/categoryController');
const { isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

// Admin-only routes
router.post('/', passport.authenticate('jwt', { session: false }), isAdmin, categoryController.createCategory);
router.put('/:id', passport.authenticate('jwt', { session: false }), isAdmin, categoryController.updateCategory);
router.delete('/:id', passport.authenticate('jwt', { session: false }), isAdmin, categoryController.deleteCategory);

module.exports = router;
