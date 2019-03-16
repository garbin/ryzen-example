FROM keymetrics/pm2:latest-alpine

WORKDIR /srv
ADD . /srv
ENV NODE_ENV=production
# Install app dependencies
RUN npm --registry=https://registry.npm.taobao.org install
# Bundle APP files
RUN npm run build

# Expose the listening port of your app
EXPOSE 8000

# Show current folder structure in logs
RUN ls -al -R

CMD [ "pm2-runtime", "start", "/srv/deploy/ecosystem.config.js", "--only ssr" ]