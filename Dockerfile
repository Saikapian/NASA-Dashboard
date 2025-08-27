# ---------- Stage 1: Build client + install server deps ----------
FROM node:18.17.1-alpine AS build
WORKDIR /app

# Install root, client, and server deps separately for better caching
COPY package.json package-lock.json ./
COPY client/package.json client/package-lock.json ./client/
COPY server/package.json server/package-lock.json ./server/

# Install dependencies for root, client, and server
RUN npm install --prefix client && \
    npm install --prefix server

# Copy source code
COPY . .

# Build React app into /app/server/public
RUN npm run build --prefix client

# ---------- Stage 2: Production image ----------
FROM node:18.17.1-alpine
WORKDIR /app

# Copy only server code + built frontend
COPY --from=build /app/server ./server

# Install only server production deps
RUN npm install --production --prefix server

# Expose backend port
EXPOSE 8000

# Start the server
CMD ["npm", "start", "--prefix", "server"]
