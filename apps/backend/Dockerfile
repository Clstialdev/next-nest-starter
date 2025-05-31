FROM node:20-alpine

ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH
ENV NODE_ENV=development
ENV TZ=UTC

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/package.json
COPY packages/shared/types/package.json ./packages/shared/types/package.json

RUN pnpm install --filter backend...

COPY . .

WORKDIR /app/apps/backend

EXPOSE 4000

CMD ["pnpm", "start:dev"]