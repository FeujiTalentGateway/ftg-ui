# Use an official Node.js image with a specific version
FROM node:18.13.0-alpine as iaangular

# Expose the port your Angular app will run on
EXPOSE 4200

# Set the working directory in the container
WORKDIR /app

# Copy the contents of your Angular app to the container
COPY . .

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install project dependencies
RUN npm install

# Build your Angular app

# Start the Angular development server
CMD ng serve --host 0.0.0.0