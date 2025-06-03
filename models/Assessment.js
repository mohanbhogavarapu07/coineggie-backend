import mongoose from 'mongoose';

const assessmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: String,
    required: true,
    enum: ['11 to 17', '18 to 24', '25 to 34', '35 to 44', '45 to 54', '55 to 64', '65+']
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other']
  },
  assessmentType: {
    type: String,
    required: true,
    enum: [
      'entrepreneurial-potential',
      'productivity-style',
      'emotional-intelligence',
      'resilience-score',
      'leadership-archetype',
      'burnout-risk',
      'mental-fitness-index'
    ]
  },
  attempted: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Assessment = mongoose.model('Assessment', assessmentSchema);

export default Assessment; 