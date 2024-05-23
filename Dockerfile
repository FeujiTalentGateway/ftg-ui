# Use an official Node.js image with a specific version
FROM node:18.17.1-alpine as iaangular

# Expose the port your Angular app will run on
EXPOSE 4200

# Set the working directory in the container
WORKDIR /app

# Copy the contents of your Angular app to the container
COPY . .

# Install Angular CLI globally with specific version
RUN npm install -g @angular/cli@17.1.2

# Install project dependencies
RUN npm install

# Build your Angular app
# RUN npm run build

# Start the Angular development server
CMD npm run start:prod