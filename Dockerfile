FROM node:18.12.1 AS builder
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM builder AS runner
WORKDIR /app
COPY --from=builder /app ./
ENTRYPOINT ["sh", "-c"]
EXPOSE 3000
CMD ["yarn start:prod"]
