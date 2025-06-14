FROM node:20-alpine AS dependencies

ENV PNPM_HOME=/root/.local/share/pnpm \
    NODE_ENV=development \
    TZ=UTC
RUN corepack enable && corepack prepare pnpm@latest --activate
    
WORKDIR /app
    

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/shared/types/package.json ./packages/shared/types/
COPY packages/shared/drizzle/package.json ./packages/shared/drizzle/
    

RUN pnpm install --filter backend... --frozen-lockfile
    
FROM node:20-alpine
    
ENV PNPM_HOME=/root/.local/share/pnpm \
    NODE_ENV=development \
    TZ=UTC
ENV PATH="$PNPM_HOME:$PATH"
    
RUN corepack enable && corepack prepare pnpm@latest --activate
    
WORKDIR /app
    
COPY --from=dependencies /root/.local/share/pnpm /root/.local/share/pnpm
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/package.json ./
COPY --from=dependencies /app/pnpm-workspace.yaml ./
    
COPY . .
    
WORKDIR /app/apps/backend
EXPOSE 4000
CMD ["pnpm", "start:dev"]