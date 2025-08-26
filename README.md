# NASA Mission Control Project

The completed version of our NASA project from [Complete Node.js Developer: Zero to Mastery](https://academy.zerotomastery.io/a/aff_jqtq5631/external?affcode=441520_1jw4f2ay).

Keep in mind that we recommend you code along with us and use this only if you ever get stuck or you don't like to code along.

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account (recommended) or local MongoDB database

### Database Setup

#### Option 1: MongoDB Atlas (Recommended)
1. Create a free [MongoDB Atlas](https://www.mongodb.com/atlas/database) database online
2. Follow the detailed setup guide: [MongoDB Atlas Setup Guide](server/MONGODB_ATLAS_SETUP.md)
3. Create a `server/.env` file with your MongoDB Atlas connection string

#### Option 2: Local MongoDB
1. Install MongoDB locally
2. Create a `server/.env` file with: `MONGO_URL=mongodb://localhost:27017/nasa-project`

### Installation
1. In the terminal, run: `npm install`
2. Copy `server/env.example` to `server/.env` and configure your database connection

## 🏃‍♂️ Running the Project

1. In the terminal, run: `npm run deploy`
2. Browse to the mission control frontend at [localhost:8000](http://localhost:8000) and schedule an interstellar launch!

## 🐳 Docker

1. Ensure you have the latest version of Docker installed
2. Run `docker build -t nasa-project .`
3. Run `docker run -it -p 8000:8000 nasa-project`

## 🧪 Running the Tests

To run any automated tests, run `npm test`. This will: 
* Run all the client-side tests: `npm test --prefix client`
* Run all the server-side tests: `npm test --prefix server`

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   └── hooks/          # Custom React hooks
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── models/         # Mongoose data models
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # Business logic & database services
│   │   └── app.js          # Express app configuration
└── data/                   # Sample data files
```

## 🔧 Environment Variables

Create a `server/.env` file with:

```env
MONGO_URL=your_mongodb_connection_string
PORT=8000
NODE_ENV=development
```

## 📚 Additional Resources

- [MongoDB Atlas Setup Guide](server/MONGODB_ATLAS_SETUP.md) - Detailed MongoDB Atlas configuration
- [Complete Node.js Developer Course](https://academy.zerotomastery.io/a/aff_jqtq5631/external?affcode=441520_1jw4f2ay) - Learn Node.js from scratch
- [MongoDB Documentation](https://docs.mongodb.com/) - Official MongoDB docs 
