FROM node:alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
COPY . /app
RUN yarn install
CMD ["yarn", "dev"]

# FROM node:alpine
# WORKDIR /app
# COPY package.json .
# RUN yarn
# COPY . .
# CMD ["yarn", "dev"]
# RUN yarn build