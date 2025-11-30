# ==== 1. Build stage ====
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Виносимо тільки package.json, щоб кеш працював
COPY package*.json ./

# Якщо у тебе є lock-файл yarn.lock / pnpm-lock.yaml — підлаштуй
RUN npm ci

# Копіюємо весь код
COPY . .

# Збираємо Nest у dist
RUN npm run build

# ==== 2. Runtime stage ====
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

ENV NODE_ENV=production

# Тільки prod-залежності
COPY package*.json ./
RUN npm ci --omit=dev

# Копіюємо зібраний код з попереднього етапу
COPY --from=builder /usr/src/app/dist ./dist

# Якщо в тебе є шаблони / статичні файли поза dist — додай їх
# COPY --from=builder /usr/src/app/prisma ./prisma

EXPOSE 3000

CMD ["node", "dist/main.js"]
