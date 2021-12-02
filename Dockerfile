# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:14-alpine as build
ENV NODE_ENV=production
# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

# Install all the dependencies
RUN npm install --production --silent  && mv node_modules ../

COPY . .

RUN chown -R node /usr/local/app

USER node

CMD ["npm", "start"]

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/portfolio-front /usr/share/nginx/html

# Expose port 80
EXPOSE 80



