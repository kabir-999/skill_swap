const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://SkillSwap4:314Flashlight@skillswap.zjnd3yh.mongodb.net/?retryWrites=true&w=majority&appName=SkillSwap');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.log('Trying alternative connection...');
    
    try {
      const conn = await mongoose.connect('mongodb+srv://SkillSwap4:314Flashlight@skillswap.zjnd3yh.mongodb.net/?retryWrites=true&w=majority&appName=SkillSwap');
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (error2) {
      console.error(`Alternative connection also failed: ${error2.message}`);
      console.log('=== TROUBLESHOOTING ===');
      console.log('1. Check your MongoDB Atlas credentials');
      console.log('2. Ensure the user has database access');
      console.log('3. Check if your IP is whitelisted');
      console.log('4. Try creating a new database user in MongoDB Atlas');
      throw error2;
    }
  }
};

module.exports = connectDB; 