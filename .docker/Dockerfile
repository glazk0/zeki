FROM node:21-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

COPY . /app

WORKDIR /app

FROM base AS deps

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

RUN pnpm run build

FROM base AS deploy

RUN useradd -D app && \
    chown -R app:app /app

USER app

COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

CMD ["node", "dist/index.js"]
