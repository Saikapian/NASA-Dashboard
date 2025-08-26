#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 MongoDB Atlas Setup Helper\n');

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function setupMongoDBAtlas() {
  try {
    console.log('This script will help you create a .env file for MongoDB Atlas.\n');
    
    const username = await question('Enter your MongoDB Atlas username: ');
    const password = await question('Enter your MongoDB Atlas password: ');
    const clusterUrl = await question('Enter your cluster URL (e.g., cluster0.xxxxx.mongodb.net): ');
    const databaseName = await question('Enter your database name (e.g., nasa-project): ');
    
    const connectionString = `mongodb+srv://${username}:${password}@${clusterUrl}/${databaseName}?retryWrites=true&w=majority`;
    
    const envContent = `# MongoDB Atlas Connection String
MONGO_URL=${connectionString}

# Server Configuration
PORT=8000
NODE_ENV=development
`;
    
    const envPath = path.join(__dirname, '.env');
    fs.writeFileSync(envPath, envContent);
    
    console.log('\n✅ .env file created successfully!');
    console.log(`📁 Location: ${envPath}`);
    console.log('\n🔒 Important: Make sure .env is in your .gitignore file to keep your credentials secure!');
    console.log('\n🚀 You can now start your server with: npm run watch');
    
  } catch (error) {
    console.error('❌ Error creating .env file:', error.message);
  } finally {
    rl.close();
  }
}

// Check if .env already exists
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  console.log('⚠️  .env file already exists!');
  rl.question('Do you want to overwrite it? (y/N): ', (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      setupMongoDBAtlas();
    } else {
      console.log('Setup cancelled.');
      rl.close();
    }
  });
} else {
  setupMongoDBAtlas();
}
