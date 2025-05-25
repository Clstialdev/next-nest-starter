FROM node:20-alpine

ENV PNPM_HOME=/root/.local/share/pnpm \
    NODE_ENV=development \
    TZ=UTC
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/shared-types/package.json ./packages/shared-types/

RUN pnpm install

COPY . .

WORKDIR /app/apps/frontend
EXPOSE 3000
CMD ["pnpm", "--filter", "frontend", "dev"]
    