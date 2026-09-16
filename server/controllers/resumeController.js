const fs = require('fs');
const { PDFParse } = require('pdf-parse');
const Resume = require('../models/Resume');
const { analyzeResumeText } = require('../services/aiService');

// @desc    Upload & parse a resume
// @route   POST /api/resumes/upload
// @access  Private
const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error('Please upload a file');
    }

    const filePath = req.file.path;
    let rawText = '';

    // Extract text from PDF
    if (req.file.mimetype === 'application/pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const parser = new PDFParse({ data: dataBuffer });
      try {
        const data = await parser.getText();
        rawText = data.text;
      } finally {
        await parser.destroy();
      }
    } else {
      // Basic placeholder for word doc - in real app use mammoth
      rawText = "Word document parsing not fully implemented in demo.";
    }

    // Call Gemini AI service to analyze raw text
    const aiAnalysis = await analyzeResumeText(rawText);

    // Save to DB
    const resume = await Resume.create({
      userId: req.user.id,
      title: req.body.title || req.file.originalname,
      fileName: req.file.filename,
      fileUrl: `/uploads/${req.file.filename}`,
      rawText: rawText,
      status: 'Analyzed',
      atsScore: aiAnalysis.atsScore,
      analysisData: {
        ...aiAnalysis,
        wordCount: rawText.split(/\s+/).length,
      }
    });

    res.status(201).json({
      message: 'Resume uploaded and analyzed successfully',
      resume
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user resumes
// @route   GET /api/resumes
// @access  Private
const getResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(resumes);
  } catch (error) {
    next(error);
  }
};

// @desc    Get resume by ID
// @route   GET /api/resumes/:id
// @access  Private
const getResumeById = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user.id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.status(200).json({ resume });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Resume not found' });
    }
    next(error);
  }
};

module.exports = {
  uploadResume,
  getResumes,
  getResumeById
};
