# Get the base image of Node version 16
FROM node:latest

# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:v1.34.0-jammy

# Set the work directory for the application
WORKDIR /app

# COPY the needed files to the app folder in Docker image
COPY . .

# Install the dependencies in Node environment
RUN npm install

# Install the browser
RUN npx playwright install chromium
RUN npm run test:ci

# now Run on terminal:
# docker build -t dalba-playwright-docker .
# docker run -p 9323:9323 -it dalba-playwright-docker:latest npm run test