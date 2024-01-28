FROM node:20.11.0-alpine as builder

# Create a folder called app in our container and set it as our working directory
# I.e all subsequent commands will use this as root
WORKDIR /app

# Copy over our package files in to the root folder of our project in the container
COPY ["package.json", "package-lock.json", "./"]

# Install npm packages
RUN npm install

# Copy everything into the image
# Files and folders in .dockerignore will not be copied into the container
COPY . .

####
# Multistage build
####
FROM node:20.11.0-alpine

WORKDIR /app

COPY --from=builder /app/ /app/

CMD [ "npm", "start" ]