# Use an official Node.js runtime as the base image
FROM node:20 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install the application's dependencies
RUN npm install

# Copy the rest of the application source code into the container
COPY . .

# Build the Angular application
RUN node_modules/.bin/ng build --configuration production

# Use NGINX as the production server
FROM nginx:alpine
COPY --from=build /app/dist/event-front /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
