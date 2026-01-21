#!/bin/sh
set -e

# Run database migrations
echo "Running database migrations..."
pnpm payload migrate

# Start the application
echo "Starting application..."
exec pnpm start
