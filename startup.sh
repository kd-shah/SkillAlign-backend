#!/bin/bash
echo "Performing database migrations..."
npx prisma migrate deploy

echo "Starting the application..."
node dist/src/index.js