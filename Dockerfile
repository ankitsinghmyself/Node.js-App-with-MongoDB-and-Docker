FROM node:16-alpine

# Set the working directory
WORKDIR /app

COPY package*.json .

# Install the Node.js dependencies
RUN npm install

# Copy the Node.js application code to the container
COPY . /app



# Expose the container port
EXPOSE 3000

# Start the Node.js application
CMD ["npm", "run", "dev"]
