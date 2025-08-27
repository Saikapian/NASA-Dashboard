# ---- Stage 1: Build the React Frontend ----
# Use a specific version of node as the 'builder'
FROM node:18-alpine AS builder

WORKDIR /app

# Copy client package files and install dependencies
COPY client/package*.json ./client/
RUN npm install --prefix client

# Copy the rest of the client source code
COPY client/ ./client/

# Build the client application
# The build script sets BUILD_PATH=../server/public, so the output goes to /app/server/public
RUN npm run build --prefix client

# ---- Stage 2: Build the Node.js Server ----
# Use a clean, small node image for the final production image
FROM node:18-alpine AS runner

WORKDIR /app

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy server package files and install ONLY production dependencies
# Do this as root before switching to appuser
COPY server/package*.json ./server/
RUN npm install --prefix server --omit=dev

# Copy the server source code
COPY server/ ./server/

# Copy the built frontend from the 'builder' stage into the server's public directory
# The server expects files in /app/server/public
COPY --from=builder --chown=appuser:appgroup /app/server/public ./server/public

# Change ownership of server files to appuser
RUN chown -R appuser:appgroup /app/server

# Switch to non-root user
USER appuser

# Expose the port the server will run on
EXPOSE 8000

# Set the command to run the application
# We use 'node' directly instead of 'npm start' for a cleaner exit signal handling
CMD ["node", "server/src/server.js"]
