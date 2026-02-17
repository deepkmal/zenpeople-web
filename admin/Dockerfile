FROM node:20-slim

WORKDIR /app

# Enable pnpm
RUN corepack enable

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Generate importmap for plugins and build
RUN pnpm generate:importmap && pnpm build

# Expose port
EXPOSE 3000

# Copy and set up start script
COPY start.sh ./
RUN chmod +x start.sh

# Start the application (runs migrations first)
CMD ["./start.sh"]
