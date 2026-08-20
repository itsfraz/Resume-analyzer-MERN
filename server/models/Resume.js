const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a resume title'],
      default: 'My Resume',
    },
    fileName: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String, // Local path or S3 URL
      required: true,
    },
    rawText: {
      type: String,
      required: true, // The extracted text from the PDF
    },
    status: {
      type: String,
      enum: ['Processing', 'Analyzed', 'Failed'],
      default: 'Processing',
    },
    atsScore: {
      type: Number,
      default: 0,
    },
    analysisData: {
      type: Object, // Structured JSON containing skills, gaps, suggestions
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Resume', resumeSchema);
