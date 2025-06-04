#!/bin/bash

BACKEND_PATH="../LetsTryToEmulate_NatureExpress"
ENV=$1

# Check if environment is provided
if [ -z "$ENV" ]; then
  echo "❌ Error: No environment provided. Use 'dev', 'test', or 'live'."
  exit 1
fi

echo "🚀 Starting the $ENV build..."

# Run appropriate build command
case $ENV in
  dev)
    npm run build-dev
    ;;
  test)
    npm run build-test
    ;;
  live)
    npm run build-live
    ;;
  *)
    echo "❌ Invalid environment: $ENV. Use 'dev', 'test', or 'live'."
    exit 1
    ;;
esac

echo "🧹 Removing old build directory..."
rm -rf "$BACKEND_PATH/public/"

echo "📁 Recreating build directory..."
mkdir -p "$BACKEND_PATH/public"

echo "📦 Copying new assets to backend /public..."
cp -rf dist/* "$BACKEND_PATH/public"

echo "✅ build files have been moved..."