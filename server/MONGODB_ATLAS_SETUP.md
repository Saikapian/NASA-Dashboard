# MongoDB Atlas Setup Guide

This guide will help you set up MongoDB Atlas for your NASA project.

## Prerequisites
- A MongoDB Atlas account (free tier available)
- Node.js and npm installed

## Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Click "Try Free" and create an account
3. Choose the free tier (M0) or a paid plan

## Step 2: Create a Cluster

1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select your preferred cloud provider (AWS, Google Cloud, or Azure)
4. Choose a region close to your location
5. Click "Create"

## Step 3: Set Up Database Access

1. In the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and password (save these securely!)
5. Set privileges to "Read and write to any database"
6. Click "Add User"

## Step 4: Set Up Network Access

1. In the left sidebar, click "Network Access"
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add your specific IP addresses
5. Click "Confirm"

## Step 5: Get Your Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your actual password
5. Replace `<database-name>` with your desired database name (e.g., "nasa-project")

## Step 6: Configure Your Environment

1. Copy `env.example` to `.env` in the server directory:
   ```bash
   cp env.example .env
   ```

2. Edit `.env` and add your MongoDB Atlas connection string:
   ```
   MONGO_URL=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/nasa-project?retryWrites=true&w=majority
   ```

## Step 7: Test Your Connection

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm run watch
   ```

3. You should see: "✅ MongoDB Atlas connection ready!"

## Connection String Format

Your connection string should look like this:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/database-name?retryWrites=true&w=majority
```

## Troubleshooting

### Common Issues:

1. **Authentication Failed**: Check your username and password
2. **Network Access Denied**: Ensure your IP is whitelisted in Network Access
3. **Connection Timeout**: Check your internet connection and firewall settings
4. **Invalid Connection String**: Verify the format and replace all placeholders

### Security Best Practices:

1. Never commit your `.env` file to version control
2. Use strong, unique passwords
3. Restrict network access to specific IPs in production
4. Regularly rotate database passwords
5. Use environment-specific connection strings

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URL` | Full MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `PORT` | Server port | `8000` |
| `NODE_ENV` | Environment | `development` |

## Next Steps

After successful connection:
1. Your data will be automatically stored in MongoDB Atlas
2. You can view your data in the MongoDB Atlas dashboard
3. Set up monitoring and alerts as needed
4. Configure backups for production use

## Support

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [MongoDB Community Forums](https://developer.mongodb.com/community/forums/)
- [MongoDB University](https://university.mongodb.com/) (Free courses)

