# Use the official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the PORT environment variable (default to 4000 if not provided)
ARG PORT=4000
ENV PORT=$PORT

# Build your Nest.js application
RUN npm run build

# Start the Nest.js application using the start:prod script
CMD ["npm", "run", "start:prod"]
