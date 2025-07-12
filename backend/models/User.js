const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  location: {
    type: String,
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters']
  },
  skillsOffered: {
    type: [String],
    required: [true, 'At least one skill offered is required'],
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'At least one skill offered is required'
    }
  },
  skillsWanted: {
    type: [String],
    required: [true, 'At least one skill wanted is required'],
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'At least one skill wanted is required'
    }
  },
  availability: {
    type: String,
    required: [true, 'Availability is required'],
    trim: true,
    maxlength: [200, 'Availability cannot exceed 200 characters']
  },
  profilePhoto: {
    type: String
  },
  isPublic: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for searching by skills
userSchema.index({ skillsOffered: 1 });
userSchema.index({ skillsWanted: 1 });
userSchema.index({ isPublic: 1 });

module.exports = mongoose.model('User', userSchema, 'profile'); 