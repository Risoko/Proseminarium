FROM node:12.16.1-alpine


WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json

RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . /app/
EXPOSE 3000
CMD ["npm", "run"]
