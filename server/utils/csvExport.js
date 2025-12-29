const Student = require('../models/student');
const { Parser } = require('json2csv');

// @desc    Export students to CSV
// @route   GET /api/students/export/csv
// @access  Private
exports.exportToCSV = async (req, res) => {
  try {
    const showDeleted = req.query.showDeleted === 'true';
    const query = showDeleted ? {} : { isDeleted: false };

    const students = await Student.find(query).select('-__v').lean();

    if (students.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No students found to export',
      });
    }

    // Format the data for CSV
    const formattedStudents = students.map(student => ({
      ID: student._id,
      'First Name': student.firstName,
      'Last Name': student.lastName,
      Email: student.email,
      'Phone Number': student.phoneNumber || 'N/A',
      Gender: student.gender,
      Birthdate: student.birthdate ? new Date(student.birthdate).toLocaleDateString() : 'N/A',
      Status: student.isDeleted ? 'Deleted' : 'Active',
      'Created At': new Date(student.createdAt).toLocaleDateString(),
    }));

    const fields = [
      'ID',
      'First Name',
      'Last Name',
      'Email',
      'Phone Number',
      'Gender',
      'Birthdate',
      'Status',
      'Created At',
    ];

    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(formattedStudents);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=students.csv');
    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};