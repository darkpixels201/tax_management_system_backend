const UnderSection = require('../models/UnderSection');

// Create UnderSection
exports.createUnderSection = async (req, res) => {
  const { underSection } = req.body;

  try {
    // Check if underSection already exists
    const existingUnderSection = await UnderSection.findOne({ underSection });

    if (existingUnderSection) {
      return res.status(400).json({ message: 'UnderSection with the given name already exists' });
    }

    const newUnderSection = new UnderSection({ underSection });
    await newUnderSection.save();

    res.status(201).json({ message: 'UnderSection created successfully', underSection: newUnderSection });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get All UnderSections
exports.getAllUnderSections = async (req, res) => {
  try {
    const underSections = await UnderSection.find();
    res.json(underSections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get UnderSection by ID
exports.getUnderSectionById = async (req, res) => {
  const underSectionId = req.params.id;

  try {
    const underSection = await UnderSection.findById(underSectionId);

    if (!underSection) {
      return res.status(404).json({ message: 'UnderSection not found' });
    }

    res.json(underSection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update UnderSection
exports.updateUnderSection = async (req, res) => {
  const underSectionId = req.params.id;
  const { underSection } = req.body;

  try {
    // Check if underSection already exists
    const existingUnderSection = await UnderSection.findOne({ underSection });

   if (existingUnderSection) {
      return res.status(400).json({ message: 'UnderSection with the given name already exists' });
   }

    const updatedUnderSection = await UnderSection.findByIdAndUpdate(
      underSectionId,
      { underSection },
      { new: true }
    );

    if (!updatedUnderSection) {
      return res.status(404).json({ message: 'UnderSection not found' });
    }

    res.json({ message: 'UnderSection updated successfully', underSection: updatedUnderSection });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete UnderSection
exports.deleteUnderSection = async (req, res) => {
  const underSectionId = req.params.id;

  try {
    const deletedUnderSection = await UnderSection.findByIdAndDelete(underSectionId);

    if (!deletedUnderSection) {
      return res.status(404).json({ message: 'UnderSection not found' });
    }

    res.json({ id: underSectionId, message: 'UnderSection deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
