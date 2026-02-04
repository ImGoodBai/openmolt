#!/bin/bash
# Quick Environment Variables Setup for Vercel

set -e

echo "======================================"
echo "Setting up Vercel Environment Variables"
echo "======================================"
echo ""

# Get domain from user
read -p "Enter your Vercel domain (e.g., goodmolt.vercel.app): " DOMAIN

if [ -z "$DOMAIN" ]; then
    echo "[ERROR] Domain cannot be empty"
    exit 1
fi

REDIRECT_URI="https://${DOMAIN}/api/auth/google"

echo ""
echo "Setting environment variables for production..."
echo ""

# DATABASE_URL
echo "[1/7] Setting DATABASE_URL..."
read -p "Enter DATABASE_URL: " DATABASE_URL_VALUE
echo "${DATABASE_URL_VALUE}" | vercel env add DATABASE_URL production

# GOOGLE_CLIENT_ID
echo "[2/7] Setting GOOGLE_CLIENT_ID..."
read -p "Enter GOOGLE_CLIENT_ID: " GOOGLE_CLIENT_ID_VALUE
echo "${GOOGLE_CLIENT_ID_VALUE}" | vercel env add GOOGLE_CLIENT_ID production

# GOOGLE_CLIENT_SECRET
echo "[3/7] Setting GOOGLE_CLIENT_SECRET..."
read -p "Enter GOOGLE_CLIENT_SECRET: " GOOGLE_CLIENT_SECRET_VALUE
echo "${GOOGLE_CLIENT_SECRET_VALUE}" | vercel env add GOOGLE_CLIENT_SECRET production

# GOOGLE_REDIRECT_URI
echo "[4/7] Setting GOOGLE_REDIRECT_URI to ${REDIRECT_URI}..."
echo "${REDIRECT_URI}" | vercel env add GOOGLE_REDIRECT_URI production

# SESSION_SECRET
echo "[5/7] Setting SESSION_SECRET..."
read -p "Enter SESSION_SECRET: " SESSION_SECRET_VALUE
echo "${SESSION_SECRET_VALUE}" | vercel env add SESSION_SECRET production

# NEXT_PUBLIC_API_URL
echo "[6/7] Setting NEXT_PUBLIC_API_URL..."
echo "https://www.moltbook.com/api/v1" | vercel env add NEXT_PUBLIC_API_URL production

# ENABLE_DEV_LOGIN
echo "[7/7] Setting ENABLE_DEV_LOGIN..."
echo "false" | vercel env add ENABLE_DEV_LOGIN production

echo ""
echo "======================================"
echo "Environment variables configured!"
echo "======================================"
echo ""
echo "IMPORTANT: Update Google OAuth settings:"
echo "1. Go to: https://console.cloud.google.com/apis/credentials"
echo "2. Add authorized redirect URI: ${REDIRECT_URI}"
echo ""
echo "Then run: npm run deploy"
echo "======================================"
