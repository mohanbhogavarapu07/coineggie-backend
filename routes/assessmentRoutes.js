import express from 'express';
import Assessment from '../models/Assessment.js';
import { sendAssessmentPDFEmail } from '../utils/emailService.js';

const router = express.Router();

// Start a new assessment
router.post('/start', async (req, res) => {
  try {
    const { name, age, gender, assessmentType } = req.body;

    if (!name || !age || !gender || !assessmentType) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const assessment = new Assessment({
      name,
      age,
      gender,
      assessmentType,
      attempted: true
    });

    await assessment.save();
    res.status(201).json(assessment);
  } catch (error) {
    console.error('Error starting assessment:', error);
    res.status(500).json({ message: 'Error starting assessment', error: error.message });
  }
});

// Complete an assessment
router.put('/complete/:id', async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    assessment.status = 'completed';
    assessment.completedAt = new Date();
    await assessment.save();

    res.json(assessment);
  } catch (error) {
    console.error('Error completing assessment:', error);
    res.status(500).json({ message: 'Error completing assessment', error: error.message });
  }
});

// Get all assessments (for admin purposes)
router.get('/all', async (req, res) => {
  try {
    const assessments = await Assessment.find()
      .sort({ createdAt: -1 });
    res.json(assessments);
  } catch (error) {
    console.error('Error fetching assessments:', error);
    res.status(500).json({ message: 'Error fetching assessments', error: error.message });
  }
});

// Send assessment PDF via email
router.post('/send-pdf', async (req, res) => {
  try {
    const { email, assessmentType, pdfBuffer } = req.body;

    if (!email || !assessmentType || !pdfBuffer) {
      return res.status(400).json({ message: 'Email, assessment type, and PDF buffer are required' });
    }

    const success = await sendAssessmentPDFEmail({
      to: email,
      assessmentType,
      pdfBuffer: Buffer.from(pdfBuffer, 'base64')
    });

    if (success) {
      res.json({ message: 'Assessment PDF sent successfully' });
    } else {
      res.status(500).json({ message: 'Failed to send assessment PDF' });
    }
  } catch (error) {
    console.error('Error sending assessment PDF:', error);
    res.status(500).json({ message: 'Error sending assessment PDF', error: error.message });
  }
});

export default router; 