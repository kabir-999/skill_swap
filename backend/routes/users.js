const express = require('express');
const router = express.Router();
const User = require('../models/User');
const upload = require('../middleware/upload');
const { validateUserProfile, handleValidationErrors } = require('../middleware/validation');

// @route   GET /api/users
// @desc    Get all user profiles (public only)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { skill, location } = req.query;
    let query = { isPublic: true };

    // Add skill filter if provided
    if (skill) {
      query.$or = [
        { skillsOffered: { $regex: skill, $options: 'i' } },
        { skillsWanted: { $regex: skill, $options: 'i' } }
      ];
    }

    // Add location filter if provided
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    const users = await User.find(query).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/users/:id
// @desc    Get a specific user profile
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/users
// @desc    Create a new user profile
// @access  Public
router.post('/', upload.single('profilePhoto'), validateUserProfile, handleValidationErrors, async (req, res) => {
  try {
    const { name, location, skillsOffered, skillsWanted, availability, isPublic } = req.body;
    
    // Handle profile photo upload
    let profilePhoto = null;
    if (req.file) {
      profilePhoto = `/uploads/${req.file.filename}`;
    }

    const userData = {
      name,
      location,
      profilePhoto,
      skillsOffered, // Already parsed as array by validation middleware
      skillsWanted,  // Already parsed as array by validation middleware
      availability,
      isPublic: isPublic !== undefined ? isPublic : true
    };

    const user = await User.create(userData);

    res.status(201).json({
      success: true,
      message: 'User profile created successfully',
      data: user
    });
  } catch (error) {
    console.error('Error creating user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/users/:id
// @desc    Update a user profile
// @access  Public
router.put('/:id', upload.single('profilePhoto'), validateUserProfile, handleValidationErrors, async (req, res) => {
  try {
    const { name, location, skillsOffered, skillsWanted, availability, isPublic } = req.body;
    
    let updateData = {
      name,
      location,
      skillsOffered, // Already parsed as array by validation middleware
      skillsWanted,  // Already parsed as array by validation middleware
      availability,
      isPublic: isPublic !== undefined ? isPublic : true
    };

    // Handle profile photo upload
    if (req.file) {
      updateData.profilePhoto = `/uploads/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User profile updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/users/:id
// @desc    Delete a user profile
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User profile deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router; 