FROM node:latest AS base

RUN npm i -g pnpm

FROM base as dependencies

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

FROM base as builder

WORKDIR /app

COPY . .

COPY --from=dependencies /app/node_modules ./node_modules

RUN pnpm build

RUN pnpm install --prod

FROM base AS deploy

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./

CMD ["pnpm", "start"]
