FROM node:12-alpine as builder

RUN mkdir -p /usr/src
WORKDIR /usr/src
COPY package.json yarn.lock ./
RUN yarn 

COPY . .
RUN yarn build:production

FROM node:12-alpine
RUN npm install pm2 -g

COPY --from=builder /usr/src/node_modules /usr/src/node_modules
COPY --from=builder /usr/src/dist /usr/src/dist
COPY --from=builder /usr/src/core-client-secret /usr/src/core-client-secret
COPY --from=builder /usr/src/core-jwt-secret /usr/src/core-jwt-secret
COPY --from=builder /usr/src/package.json /usr/src/package.json
COPY --from=builder /usr/src/ecosystem-production.json /usr/src/ecosystem.json

EXPOSE 9999
WORKDIR /usr/src
ENTRYPOINT ["pm2-runtime", "start", "ecosystem.json"]




