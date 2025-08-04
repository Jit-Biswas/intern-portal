const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection failed:', err));

// Schema & Model
const applicantSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  role: String
});

const Applicant = mongoose.model('Applicant', applicantSchema);

// API routes
app.post('/api/apply', async (req, res) => {
  try {
    const applicant = new Applicant(req.body);
    await applicant.save();
    res.json({ message: 'Application submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

app.get('/api/applicants', async (req, res) => {
  try {
    const applicants = await Applicant.find();
    res.json(applicants);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applicants' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
