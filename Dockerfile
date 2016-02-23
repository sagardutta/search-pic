FROM node:slim

WORKDIR /www

ADD package.json /www/

RUN npm install

RUN ln -s /usr/bin/nodejs /usr/bin/node

EXPOSE 3000

CMD ["node", "server.js"]
