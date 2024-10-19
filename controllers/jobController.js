const Job = require('../models/Job');
const User = require('../models/User');
const sendEmail = require('../utils/emailSender');

exports.createJob = async (req, res) => {
  try {
    const { title, description, experienceLevel, candidates, endDate } = req.body;
    const newJob = new Job({
      company: req.user.id,
      title,
      description,
      experienceLevel,
      candidates: candidates.split(',').map(email => email.trim()),
      endDate,
    });

    await newJob.save();

    // Send email to candidates
    const company = await User.findById(req.user.id);
    for (const candidateEmail of newJob.candidates) {
      await sendEmail(
        candidateEmail,
        'New Job Opportunity',
        `
        Dear Candidate,

        A new job opportunity has been posted that matches your profile:

        Title: ${newJob.title}
        Company: ${company.companyName}
        Experience Level: ${newJob.experienceLevel}
        Description: ${newJob.description}

        If you're interested, please apply before ${new Date(newJob.endDate).toLocaleDateString()}.

        Best regards,
        Job Board Team
        `
      );
    }

    res.status(201).json(newJob);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ company: req.user.id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};