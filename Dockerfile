FROM oven/bun:1.0.25-alpine
WORKDIR /app
COPY . .
RUN bun install
EXPOSE 3001
CMD ["bun", "start"]