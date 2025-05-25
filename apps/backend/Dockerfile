
FROM node:20-alpine
ENV PNPM_HOME=/root/.local/share/pnpm \
    NODE_ENV=development \
    TZ=UTC
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/backend/package.json ./apps/backend/
COPY packages/shared-types/package.json ./packages/shared-types/

RUN pnpm install

COPY . .

WORKDIR /app/apps/backend
EXPOSE 4000
CMD ["pnpm", "--filter", "backend", "start:dev"]