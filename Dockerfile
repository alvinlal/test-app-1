FROM --platform=linux/amd64 node:16.19-alpine
WORKDIR /app
RUN npm install -g @nestjs/cli
COPY package.json package-lock.json nest-cli.json tsconfig.json tsconfig.build.json ./
COPY ./src ./src
RUN npm install --omit=dev && npm run build && find dist -type f -name '*.js.map' -delete && find dist -type f -name '*.d.ts' -delete &&  find dist -type f -name '*.spec.ts' -delete && rm dist/tsconfig.build.tsbuildinfo

FROM --platform=linux/amd64 node:16.19-alpine
WORKDIR /app
COPY --from=0 /app/node_modules ./node_modules
COPY --from=0 /app/dist ./dist
EXPOSE 3000
CMD ["node","dist/main"]


