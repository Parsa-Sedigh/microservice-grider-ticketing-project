FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

# set up the command to run, when the the container first starts up:
CMD ["npm", "start"]