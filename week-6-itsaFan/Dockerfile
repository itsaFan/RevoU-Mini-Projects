# Choosing node latest for this app
FROM node:lts-slim

# Create and set a working directory for the project
WORKDIR /app

# Copying the package.json to the docker container
COPY package*.json ./

# Install Node dependencies
RUN npm install

# Copying the rest of the application files to the container
COPY . .

# Exposing the port for this app
EXPOSE 3001

# Executing and start app.js
CMD ["npm", "start"]