const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Auth = require('../models/Auth');

// MongoDB connection string
const MONGODB_URI = 'mongodb+srv://SkillSwap4:314Flashlight@skillswap.zjnd3yh.mongodb.net/?retryWrites=true&w=majority&appName=SkillSwap';

// Admin users data
const adminUsers = [
  {
    email: 'kabir@gmail.com',
    password: 'kabir2005',
    isAdmin: true
  },
  {
    email: 'aayush@gmail.com',
    password: 'aayush2005',
    isAdmin: true
  },
  {
    email: 'aagnya@gmail.com',
    password: 'aagnya2005',
    isAdmin: true
  },
  {
    email: 'diya@gmail.com',
    password: 'diya2005',
    isAdmin: true
  }
];

async function addAdminUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing admin users (optional - comment out if you want to keep existing)
    await Auth.deleteMany({ isAdmin: true });
    console.log('🗑️  Cleared existing admin users');

    // Add admin users
    for (const adminUser of adminUsers) {
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(adminUser.password, saltRounds);

      // Create admin user
      const newAdmin = new Auth({
        email: adminUser.email,
        password: hashedPassword,
        isAdmin: true
      });

      await newAdmin.save();
      console.log(`✅ Added admin: ${adminUser.email}`);
    }

    console.log('\n🎉 All admin users added successfully!');
    console.log('\n📋 Admin Users:');
    adminUsers.forEach(user => {
      console.log(`   - ${user.email} (Password: ${user.password})`);
    });

  } catch (error) {
    console.error('❌ Error adding admin users:', error);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed');
  }
}

// Run the script
addAdminUsers(); 