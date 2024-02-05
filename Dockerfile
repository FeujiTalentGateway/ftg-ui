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

# Build your Angular app for production
RUN ng build --configuration=production

# Install 'http-server' to serve the production build
RUN npm install -g http-server

# Serve the built production files using 'http-server' on 0.0.0.0:4200
CMD ["http-server", "dist/image-analyzer-ui", "-p", "4200", "-a", "0.0.0.0"]