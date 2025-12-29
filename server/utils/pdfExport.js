const Student = require('../models/student');
const PDFDocument = require('pdfkit');

// @desc    Export students to PDF
// @route   GET /api/students/export/pdf
// @access  Private
exports.exportToPDF = async (req, res) => {
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

    // Create a new PDF document
    const doc = new PDFDocument({ margin: 30, size: 'A4' });

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=students.pdf');

    // Pipe the PDF to the response
    doc.pipe(res);

    // Add title
    doc.fontSize(20).font('Helvetica-Bold').text('Student Management System', {
      align: 'center',
    });
    doc.moveDown();
    doc.fontSize(16).text('Student Records', { align: 'center' });
    doc.moveDown();
    doc.fontSize(10).font('Helvetica').text(`Generated on: ${new Date().toLocaleString()}`, {
      align: 'center',
    });
    doc.moveDown(2);

    // Table setup
    const tableTop = 150;
    const itemHeight = 30;
    let y = tableTop;

    // Draw table header
    doc.fontSize(10).font('Helvetica-Bold');
    const headers = ['Name', 'Email', 'Phone', 'Gender', 'Status'];
    const colWidths = [120, 150, 100, 70, 70];
    let x = 30;

    headers.forEach((header, i) => {
      doc.text(header, x, y, { width: colWidths[i], align: 'left' });
      x += colWidths[i];
    });

    // Draw header line
    doc.moveTo(30, y + 15).lineTo(570, y + 15).stroke();
    y += itemHeight;

    // Draw table rows
    doc.font('Helvetica').fontSize(9);
    students.forEach((student, index) => {
      // Check if we need a new page
      if (y > 700) {
        doc.addPage();
        y = 50;

        // Redraw header on new page
        doc.fontSize(10).font('Helvetica-Bold');
        x = 30;
        headers.forEach((header, i) => {
          doc.text(header, x, y, { width: colWidths[i], align: 'left' });
          x += colWidths[i];
        });
        doc.moveTo(30, y + 15).lineTo(570, y + 15).stroke();
        y += itemHeight;
        doc.font('Helvetica').fontSize(9);
      }

      x = 30;
      const fullName = `${student.firstName} ${student.lastName}`;
      const phone = student.phoneNumber || 'N/A';
      const status = student.isDeleted ? 'Deleted' : 'Active';

      const rowData = [fullName, student.email, phone, student.gender, status];

      rowData.forEach((data, i) => {
        doc.text(data, x, y, { width: colWidths[i], align: 'left' });
        x += colWidths[i];
      });

      // Draw row separator
      if (index < students.length - 1) {
        doc.moveTo(30, y + 20).lineTo(570, y + 20).stroke();
      }

      y += itemHeight;
    });

    // Add footer
    doc.fontSize(8).text(
      `Total Students: ${students.length}`,
      30,
      doc.page.height - 50,
      { align: 'center' }
    );

    // Finalize the PDF
    doc.end();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};