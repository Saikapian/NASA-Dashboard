# Stage 1: Install dependencies and build the client
FROM node:18-alpine AS build
WORKDIR /app

# Copy all package files first to leverage Docker layer caching
COPY package.json package-lock.json ./
COPY client/package.json client/package-lock.json ./client/
COPY server/package.json server/package-lock.json ./server/

# Run the install script from the root package.json
RUN npm run install

# Copy the rest of the source code
COPY ./ ./

# Run the client build script
RUN npm run build --prefix client

# Stage 2: Create the final, lean production image
FROM node:18-alpine
WORKDIR /app

# Copy only the server dependencies and source from the build stage
COPY --from=build /app/server ./server
COPY --from=build /app/node_modules ./node_modules

# Copy the built client application from the build stage
COPY --from=build /app/client/build ./client/build

# Expose the port the server runs on
EXPOSE 8000

# Run the server's start script
CMD ["npm", "start", "--prefix", "server"]
