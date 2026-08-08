# -----------------------------
# Base Stage
# -----------------------------
FROM node:24-alpine AS base

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

# -----------------------------
# Development Stage
# -----------------------------
FROM base AS development

ENV NODE_ENV=development

COPY . .

EXPOSE 5173

CMD ["pnpm", "run", "dev", "--host"]

# -----------------------------
# Testing Stage
# -----------------------------
FROM base AS test

ENV NODE_ENV=test

COPY . .

CMD ["pnpm", "run", "test"]

# -----------------------------
# Builder Stage
# -----------------------------
FROM base AS builder

COPY . .

RUN pnpm run build

# -----------------------------
# Production Stage
# -----------------------------
FROM nginx:1.29-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]