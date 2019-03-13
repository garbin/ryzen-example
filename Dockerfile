FROM node:latest
WORKDIR /srv
ADD . /srv
ENV NODE_ENV=production
RUN npm --registry=https://registry.npm.taobao.org install
RUN npm run build
CMD npm start
