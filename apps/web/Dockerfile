FROM node:20-slim AS base
RUN corepack enable && corepack prepare pnpm@9.1.0 --activate

WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/web/package.json apps/web/
COPY packages/shared/package.json packages/shared/

RUN pnpm install --no-frozen-lockfile

COPY packages/shared/ packages/shared/
COPY apps/web/ apps/web/

ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app/apps/web
RUN pnpm build

ENV NODE_ENV=production
EXPOSE 3000
ENV PORT=3000

CMD ["node", ".next/standalone/apps/web/server.js"]
