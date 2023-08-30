FROM node:latest AS base

RUN npm i -g pnpm

# Create the image based on the official Node 16 image from Dockerhub
FROM base as dependencies

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Copy dependency definitions
COPY package.json pnpm-lock.yaml ./

# Install dependencies using npm
RUN pnpm install --frozen-lockfile


FROM base as migration

WORKDIR /app

COPY . .

COPY --from=dependencies /app/node_modules ./node_modules

FROM base as builder

WORKDIR /app

COPY . .

COPY --from=dependencies /app/node_modules ./node_modules

# RUN pnpm db:push

RUN pnpm build

RUN pnpm prune --prod

FROM base AS deploy

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./

CMD [ "pnpm", "start" ]
