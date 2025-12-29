const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  restoreStudent,
  permanentDeleteStudent,
} = require('../controllers/studentController');
const { exportToCSV } = require('../utils/csvExport');
const { exportToPDF } = require('../utils/pdfExport');
const { protect } = require('../middleware/authMiddleware');

// Validation rules
const studentValidation = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters'),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('phoneNumber')
    .optional()
    .matches(/^[0-9]{10,15}$/)
    .withMessage('Please provide a valid phone number'),
  body('gender')
    .notEmpty()
    .withMessage('Gender is required')
    .isIn(['Male', 'Female', 'Other'])
    .withMessage('Gender must be Male, Female, or Other'),
  body('birthdate')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid date'),
];

// Export routes (must be before /:id routes)
router.get('/export/csv', protect, exportToCSV);
router.get('/export/pdf', protect, exportToPDF);

// CRUD routes
router.route('/')
  .get(protect, getStudents)
  .post(protect, studentValidation, createStudent);

router.route('/:id')
  .get(protect, getStudent)
  .put(protect, studentValidation, updateStudent)
  .delete(protect, deleteStudent);

router.put('/:id/restore', protect, restoreStudent);
router.delete('/:id/permanent', protect, permanentDeleteStudent);

module.exports = router;