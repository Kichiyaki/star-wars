FROM node:14.17-alpine as builder

# build stage

ENV NODE_ENV build

WORKDIR /home/node
COPY . .
RUN yarn && yarn run build

# ---

FROM node:14.17-alpine

WORKDIR /home/node
ENV NODE_ENV production

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/dist/ /home/node/dist/
COPY --from=builder /home/node/node_modules/ /home/node/node_modules/

EXPOSE 3000

CMD yarn start:prod
