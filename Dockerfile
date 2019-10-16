FROM node:10.16.3-stretch

WORKDIR /home/work

COPY package*.json ./

RUN npm install

COPY . ./

ENTRYPOINT ["node", "main.js"]
