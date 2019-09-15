#base image
FROM node

# set working directory
RUN mkdir /usr/src/app
RUN mkdir /usr/src/app/ttt-client
#copy all files from current directory to docker
COPY . /usr/src/app/ttt-client

WORKDIR /usr/src/app/ttt-client

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app//ttt-client/node_modules/.bin:$PATH

# install and cache app dependencies
RUN yarn

# start app
CMD ["yarn", "start"]