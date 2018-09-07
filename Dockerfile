FROM node:10.8.0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
EXPOSE 3000

CMD ["npm", "run", "start"]

COPY package.json /usr/src/app
RUN npm install

COPY . /usr/src/app

