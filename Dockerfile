#base image
FROM node:10-alpine

# set working directory
RUN mkdir -p /usr/src/app/ttt-client

#copy all files from current directory to docker
COPY . /usr/src/app/ttt-client

WORKDIR /usr/src/app/ttt-client

RUN yarn && \
    yarn build

# start app
CMD ["yarn", "start"]

EXPOSE 3000