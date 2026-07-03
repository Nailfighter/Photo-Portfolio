# Stage 1: Build the React application
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies using clean install
RUN npm ci

# Copy all source files
COPY . .

# Build the application
# Note: Vite loads environment variables from the .env file during build time.
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Copy static assets from build stage to Nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
